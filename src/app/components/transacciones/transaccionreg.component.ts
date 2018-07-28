import { Component, Output, EventEmitter } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { Ma_Article } from '../shared/modelos/Ma_Article';
import { MaestrosService } from '../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { tra_DetalleIA } from '../shared/modelos/Tra_DetalleIA';

@Component({
  selector: 'app-transaccionreg',
  templateUrl: './transaccionreg.component.html',
  styles: []
})
export class TransaccionregComponent {
  eArticulos: Ma_Article[] = [];
  eArticulo: Ma_Article;
  eDetalleIA: tra_DetalleIA;
  frmDet: FormGroup;

  @Output() estadoboton: EventEmitter<boolean>;

  constructor(private traServicio: TransaccionesService,
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


  HelpBuscarArticulos(patron: string) {
    this.eArticulos = this.maestroservicio.getBuscaArticulosxPatron(patron);
  }

  HelpCargarArticulo(idArt: string) {
    console.log("Codigo de articulo:", idArt);
    this.eArticulo = this.maestroservicio.getArticulo(idArt)
    this.frmDet.controls['f_txtCodArti'].setValue(this.eArticulo.ID_ARTICLE);
    this.frmDet.controls['f_txtDesArti'].setValue(this.eArticulo.DESCRIPTION_ARTICLE);
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
