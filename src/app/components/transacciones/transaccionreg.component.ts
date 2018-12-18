import { Component, Output, EventEmitter } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { Ma_Article } from '../shared/modelos/Ma_Article';
import { MaestrosService } from '../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tra_DetalleIA } from '../shared/modelos/Tra_DetalleIA';
import { Tra_Warehouse_qty } from '../shared/modelos/Tra_Warehouse_qty';
import { Ma_Lot } from '../shared/modelos/Ma_Lot';
import { Re_StockLote } from '../shared/modelos/Re_StockLote';

declare var $: any;

@Component({
  selector: 'app-transaccionreg',
  templateUrl: './transaccionreg.component.html',
  styles: []
})
export class TransaccionregComponent {
  eArticulos: Ma_Article[] = [];
  eArticulo: Ma_Article;
  eDetalleIA: tra_DetalleIA;
  eLotes: Ma_Lot[];
  frmDet: FormGroup;
  frmLote: FormGroup;
  eLote: Ma_Lot;
  desarticulo: string;
  bol_cargando: boolean;

  bol_msj: boolean = false;
  bol_error: boolean;
  msj_error: string;
  msj_ok: string;

  @Output() estadoboton: EventEmitter<boolean>;

  constructor(
    private traServicio: TransaccionesService,
    private maestroservicio: MaestrosService) {

    this.estadoboton = new EventEmitter();

    //iniciamos el formulario
    this.frmDet = new FormGroup({
      'f_txtCodArti': new FormControl('', Validators.required),
      'f_txtDesArti': new FormControl('', Validators.required),
      'f_txtUniMed': new FormControl(''),
      'f_txtStock': new FormControl(''),
      'f_cmbLote': new FormControl(''),
      'f_txtfecVcto': new FormControl(''),
      'f_txtStockLote': new FormControl(''),
      'f_txtNumProtocolo': new FormControl(''),
      'f_txtCostoUnit': new FormControl(''),
      'f_txtCanDet': new FormControl('', Validators.required),
      'f_txtNumBultos': new FormControl(''),
      'f_txtGlosaDet': new FormControl(''),
      'f_txtProcedencia': new FormControl(''),
      'f_txtPaisOri': new FormControl(''),
      'f_chkEslote': new FormControl(''),
    });

    this.frmLote = new FormGroup({
      'IDLOT': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'DESCRIPTION': new FormControl('', Validators.required),
      'EXPEDITION_DATE': new FormControl('', Validators.required),
      'CADUCATE_DATE': new FormControl('', Validators.required),
      'COMMENT': new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

  }


  HelpBuscarArticulos(patron: any) {
    this.maestroservicio.getArticuloxNombre(patron.value)
      .then((resp: Ma_Article[]) => { this.eArticulos = resp; });
  }

  HelpCargarArticulo(idArt: number) {

    this.eArticulos.forEach(element => {
      if (element.ID_ARTICLE == idArt) {

        this.frmDet.controls['f_txtCodArti'].setValue(element.ID_ARTICLE);
        this.frmDet.controls['f_txtDesArti'].setValue(element.DESCRIPTION_ARTICLE);
        this.frmDet.controls['f_txtUniMed'].setValue(element.ID_UNIT);

        //Habilitamos el combo de Stock
        console.log('sku:', element.SKU_ARTICLE);

        this.frmDet.controls['f_chkEslote'].setValue(false);
        if (element.SKU_ARTICLE == '1') {
          this.frmDet.controls['f_chkEslote'].setValue(true);
          this.maestroservicio.getLotesxArticulo(idArt).then((data: Ma_Lot[]) => { this.eLotes = data });
        }

        //Buscamos el stock
        if (element.SKU_ARTICLE == '0') {
          //stock por articulo
          this.traServicio.getStockxArti(idArt, this.traServicio.tmpCodAlmacen).subscribe(
            (dat: Tra_Warehouse_qty) => {
              if (dat) { this.frmDet.controls['f_txtStock'].setValue(dat.QTY); }
              else { this.frmDet.controls['f_txtStock'].setValue(0) }
            }, eer => console.log(eer));
        }
        else {
          //stock total por lote
          this.traServicio.getStockTotalxLote(idArt, this.traServicio.tmpCodAlmacen).subscribe(
            (valor: number) => { this.frmDet.controls['f_txtStock'].setValue(valor); }
            , error => console.log(error)
          );

          //this.frmDet.controls['f_txtStock'].setValue(99);
        }
      }
    });

  }

  cambioLote(lote) {
    //buscamos stock por lote
    let idArt: number = 0;
    idArt = this.frmDet.get('f_txtCodArti').value;
    this.traServicio.getStockxLote(idArt, this.traServicio.tmpCodAlmacen, lote)
      .subscribe((dat: Re_StockLote) => {
        if (dat) {
          this.frmDet.controls['f_txtStockLote'].setValue(dat.QTY);
          this.frmDet.controls['f_txtfecVcto'].setValue(dat.FECVEN);
          console.log('fecha venc lote:', dat.FECVEN);
        }
        else { this.frmDet.controls['f_txtStockLote'].setValue(0) }

      }, eer => console.log(eer)
      );
  }


  InsertDetalle() {
    //validamos si tiene lote 

    if (this.frmDet.get('f_chkEslote').value) {
      if (!this.frmDet.get('f_cmbLote').value) {
        alert("Falta el lote del articulo.");
        return;
      }
    }

    // this.eDetalleIA = null;
    this.eDetalleIA = new tra_DetalleIA(0,
      this.frmDet.get('f_txtCodArti').value,
      this.frmDet.get('f_txtDesArti').value,
      this.frmDet.get('f_txtUniMed').value,
      this.frmDet.get('f_cmbLote').value,
      this.frmDet.get('f_txtCanDet').value,
      this.frmDet.get('f_txtNumProtocolo').value,
      this.frmDet.get('f_txtNumBultos').value,
      this.frmDet.get('f_txtCostoUnit').value,
      "",
      this.frmDet.get('f_txtProcedencia').value,
      this.frmDet.get('f_txtPaisOri').value,
      this.frmDet.get('f_txtGlosaDet').value
    );

    this.traServicio.setDetalleIA(this.eDetalleIA);
    this.estadoboton.emit(false);
  }


  openModalLotes() {
    this.desarticulo = this.frmDet.get('f_txtDesArti').value;
    $('#modalLote').modal();
  }

  grabarLote() {
    // 'IDLOT': new FormControl('', Validators.required),
    // 'DESCRIPTION': new FormControl('', Validators.required),
    // 'EXPEDITION_DATE': new FormControl('', Validators.required),
    // 'CADUCATE_DATE': new FormControl('', Validators.required),
    // 'COMMENT': new FormControl('')      
    let idarticulo: number = this.frmDet.get('f_txtCodArti').value;

    let fecEmi = this.frmLote.get('EXPEDITION_DATE').value;
    let fecVto = this.frmLote.get('CADUCATE_DATE').value;
    fecEmi = fecEmi.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    fecVto = fecVto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');


    this.eLote = new Ma_Lot(1, idarticulo,
      this.frmLote.get('IDLOT').value,
      this.frmLote.get('DESCRIPTION').value,
      fecEmi, fecVto,
      this.frmLote.get('COMMENT').value, 'A');


    this.maestroservicio.nuevoLote(this.eLote).then(
      (res: string) => {
        if (res == "ok") {
          this.bol_msj = true;
          this.msj_ok = "Se grabo el lote correctamente";

          //cargar el combo de lote de nuevo!!
          this.maestroservicio.getLotesxArticulo(idarticulo).then((
            data: Ma_Lot[]) => {
            this.eLotes = data;
            
            setTimeout(() => {

              this.bol_msj = false;
              //cerramos el modal si todo sale bien
              $('#modalLote').modal('hide');

            }, 2000);
          }).catch(err => this.ShowError(err));

        }
      }
    ).catch(err => this.ShowError(err));


  }


  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }


}
