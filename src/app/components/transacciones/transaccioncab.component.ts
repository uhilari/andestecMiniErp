import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_Provider } from '../shared/modelos/Ma_Provider';
import { MaestrosService } from '../../services/maestros.service';
import { Ma_TipoTransaccion } from '../shared/modelos/Ma_TipoTransaccion';
import { Ma_Warehouse } from '../shared/modelos/Ma_Warehouse';
import { Ma_Moneda } from '../shared/modelos/Ma_Moneda';
import { Ma_Documentos } from '../shared/modelos/Ma_Documentos';

@Component({
  selector: 'app-transaccioncab',
  templateUrl: './transaccioncab.component.html',
  styles: []
})
export class TransaccioncabComponent {
  forma: FormGroup;
  eProveedores: Ma_Provider[] = [];
  eProveedor: Ma_Provider;
  eTipoTrans: Ma_TipoTransaccion[] = [];
  eAlmacenes: Ma_Warehouse[] = [];
  eMonedas: Ma_Moneda[] = [];
  eDocumentos: Ma_Documentos[] = [];

  constructor(private mservicio: MaestrosService) {

    //cargamos la entidad para los combos
    this.eTipoTrans = mservicio.getTipoTransacciones();
    this.eAlmacenes = mservicio.getAlmacenes();
    this.eMonedas = mservicio.getMonedas();
    this.eDocumentos = mservicio.getDocumentos();

    //iniciamos el formulario
    this.forma = new FormGroup({
      'f_txtFecha': new FormControl(''),
      'f_cmbTransaccion': new FormControl('CN', Validators.required),
      'f_cmbAlmacen': new FormControl('1', Validators.required),
      'f_cmbMoneda': new FormControl('PEN', Validators.required),
      'f_cmbDocRef': new FormControl('FT'),
      'f_txtNumSer': new FormControl(''),
      'f_txtOrdCom': new FormControl(''),
      'f_txtProve': new FormControl('', Validators.required),
      'f_txtProveDes': new FormControl('', Validators.required),
      'f_txtObs': new FormControl('')
    });
  }

  HelpBuscarProveedores(patron: any) {
    this.eProveedores = this.mservicio.getBuscaProveedores(patron.value);
  }

  HelpCargarProveedor(Idproveedor: string) {
    console.log(Idproveedor);
    this.eProveedor = this.mservicio.getProveedor(Idproveedor)
    this.forma.controls['f_txtProve'].setValue(this.eProveedor.ID_PROVIDER);
    this.forma.controls['f_txtProveDes'].setValue(this.eProveedor.DESCRIPTION_PROVIDER);
  }

}
