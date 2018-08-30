import { Component, Output, EventEmitter } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { Ma_Article } from '../shared/modelos/Ma_Article';
import { MaestrosService } from '../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tra_DetalleIA } from '../shared/modelos/Tra_DetalleIA';
import { Tra_Warehouse_qty } from '../shared/modelos/Tra_Warehouse_qty';
import { Ma_Lot } from '../shared/modelos/Ma_Lot';

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
    });

  }


  HelpBuscarArticulos(patron: any) {
    this.maestroservicio.getArticuloxNombre(patron.value)
      .subscribe((resp: Ma_Article[]) => {
        this.eArticulos = resp;
        console.log(resp);
      });
  }

  HelpCargarArticulo(idArt: number) {

    this.eArticulos.forEach(element => {
      if (element.ID_ARTICLE == idArt) {

        this.frmDet.controls['f_txtCodArti'].setValue(element.ID_ARTICLE);
        this.frmDet.controls['f_txtDesArti'].setValue(element.DESCRIPTION_ARTICLE);
        this.frmDet.controls['f_txtUniMed'].setValue(element.ID_UNIT);

        //Habilitamos el combo de Stock
        console.log('sku:', element.SKU_ARTICLE);

        if (element.SKU_ARTICLE == 1) {
          this.maestroservicio.getLotesxArticulo(idArt).subscribe(
            (data: Ma_Lot[]) => {
              this.eLotes = data;
              console.log('carga lotes:', data);
            });
        }

        //Buscamos el stock
        this.traServicio.getStockxArti(idArt, this.traServicio.tmpCodAlmacen).subscribe((dat: Tra_Warehouse_qty) => {
          this.frmDet.controls['f_txtStock'].setValue(dat.QTY);
        }, eer => this.frmDet.controls['f_txtStock'].setValue(0)
        );

      }
    });

  }

  InsertDetalle() {
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
      this.frmDet.get('f_txtGlosaDet').value);

    this.traServicio.setDetalleIA(this.eDetalleIA);

    this.estadoboton.emit(false);
  }






}
