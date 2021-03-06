import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_Provider } from '../shared/modelos/Ma_Provider';
import { MaestrosService } from '../../services/maestros.service';
import { Ma_TipoTransaccion } from '../shared/modelos/Ma_TipoTransaccion';
import { Ma_Warehouse } from '../shared/modelos/Ma_Warehouse';
import { Ma_Moneda } from '../shared/modelos/Ma_Moneda';
import { Ma_TipoMovimiento } from '../shared/modelos/Ma_TipoMovimiento';
import { Ma_Center_Cost } from '../shared/modelos/Ma_Center_Cost';
import { Ma_Customer } from '../shared/modelos/Ma_Customer';
import { Tra_Warehouse } from '../shared/modelos/Tra_Warehouse';
import { TransaccionesService } from '../../services/transacciones.service';
import { MA_DOCUMENTS } from '../shared/modelos/MA_DOCUMENTS';
import { Router } from "@angular/router";

@Component({
  selector: 'app-transaccioncab',
  templateUrl: './transaccioncab.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})

export class TransaccioncabComponent {
  forma: FormGroup;
  eClientes: Ma_Customer[] = [];
  eProveedores: Ma_Provider[] = [];
  eProveedor: Ma_Provider;
  eTipoTrans: Ma_TipoTransaccion[] = [];
  eTipoMov: Ma_TipoMovimiento[] = [];
  eAlmacenes: Ma_Warehouse[] = [];
  eMonedas: Ma_Moneda[] = [];
  eDocumentos: MA_DOCUMENTS[] = [];
  eCentrocostos: Ma_Center_Cost[] = [];
  cargando: boolean = false;
  bol_cargando: boolean = false;
  bol_msj: boolean = false;
  bol_msjErr: boolean = false;
  msj_ok: string = "";
  msjError: string = "";

  constructor(
    private mservicio: MaestrosService,
    private tservcicio: TransaccionesService,
    private router: Router
  ) {

    //cargamos la entidad para los combos
    this.CargarCombos();

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + "-" + x.getDate();

    this.forma = new FormGroup({
      'f_txtFecha': new FormControl(fechaReg, Validators.required),
      'f_cmb_tipomov': new FormControl('I', Validators.required),
      'f_cmbTransaccion': new FormControl('CN', Validators.required),
      'f_cmbAlmacen': new FormControl('1', Validators.required),
      'f_cmbMoneda': new FormControl('PEN', Validators.required),
      'f_cmbDocRef': new FormControl('FT'),
      'f_txtserRef': new FormControl(''),
      'f_txtNumRef': new FormControl(''),
      'f_cmbcc': new FormControl(''),
      'f_txtProve': new FormControl('', Validators.required),
      'f_txtProveDes': new FormControl('', Validators.required),
      'f_txtCli': new FormControl('', Validators.required),
      'f_txtCliDes': new FormControl('', Validators.required),
      'f_txtObs': new FormControl(''),
      'f_rbAnexo': new FormControl('p'),
    });
  }

  CargarCombos() {
    //centro de costos    
    this.mservicio.getCentrocostos()
      .then((resp: Ma_Center_Cost[]) => {
        this.eCentrocostos = resp;
      });

    //Almacenes
    this.mservicio.getAlmacenes()
      .then((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
      });


    this.mservicio.getTipoTransaccionxTipo('I')
      .subscribe((resp: Ma_TipoTransaccion[]) => {
        this.eTipoTrans = resp;
      });

    this.eTipoMov = this.mservicio.getTipoMovimiento();
    this.eMonedas = this.mservicio.getMonedas();

    this.mservicio.getDocumentos()
      .then((resp: MA_DOCUMENTS[]) => {
        this.eDocumentos = resp;
      });

  }

  cambioTipo(deviceValue) {
    console.log('cambio', deviceValue);
    this.mservicio.getTipoTransaccionxTipo(deviceValue)
      .subscribe((resp: Ma_TipoTransaccion[]) => {
        this.eTipoTrans = resp;
      });
    console.log(this.eTipoTrans);
  }


  cambioAlmacen(deviceValue) {
    this.tservcicio.tmpCodAlmacen = this.forma.get('f_cmbAlmacen').value;
  }


  HelpBuscarProveedores(patron: any) {
    this.mservicio.getBuscaProveedores(patron.value)
      .then((resp: Ma_Provider[]) => {
        this.eProveedores = resp;
        console.log(resp);
      });
  }

  HelpBuscarClientes(patron: any) {
    this.mservicio.getClientesxNombre(patron.value)
      .then((resp: Ma_Customer[]) => {
        this.eClientes = resp;
        console.log(resp);
      });
  }

  HelpCargarProveedor(Idproveedor: number) {
    this.mservicio.getProveedor(Idproveedor)
      .subscribe((res: Ma_Provider) => {
        this.forma.get('f_txtProve').setValue(res.ID_PROVIDER);
        this.forma.get('f_txtProveDes').setValue(res.DESCRIPTION_PROVIDER)
      });
  }

  HelpCargarCliente(Idcliente: number) {
    this.mservicio.getCliente(Idcliente)
      .subscribe((res: Ma_Customer) => {
        this.forma.get('f_txtCli').setValue(res.ID_CUSTOMER);
        this.forma.get('f_txtCliDes').setValue(res.DESCRIPTION_CUSTOMER)
      });
  }



  grabarDocumento() {

    let fecTrans = this.forma.get('f_txtFecha').value;
    fecTrans = fecTrans.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');

    let eCab = new Tra_Warehouse();
    eCab.ID_COMPANY = 0;
    eCab.ID_TRANSACTION_WAREHOUSE = 0;
    eCab.ID_WAREHOUSE = this.forma.get('f_cmbAlmacen').value;
    eCab.ITRANSACTION = this.forma.get('f_cmb_tipomov').value;
    eCab.TRANSACTION_TYPE = this.forma.get('f_cmbTransaccion').value;
    eCab.DOCUMENT_TYPE = this.forma.get('f_cmbDocRef').value;
    eCab.ID_SERIE = this.forma.get('f_txtserRef').value;
    eCab.ID_CORRELATIVE = this.forma.get('f_txtNumRef').value;
    eCab.TRANSACTION_DATE = fecTrans;
    eCab.TRANSACCION_CURRENCY = this.forma.get('f_cmbMoneda').value;
    eCab.ISTATUS = 1;
    eCab.AUSUARIO = '';
    eCab.AFECREG = '';
    eCab.IDCC = this.forma.get('f_cmbcc').value;
    eCab.COMMENT = this.forma.get('f_txtObs').value;
    eCab.TIPOPER = this.forma.get('f_rbAnexo').value;
    if (eCab.TIPOPER == 'p') {
      eCab.PERSONA = this.forma.get('f_txtProve').value;
    } else { eCab.PERSONA = this.forma.get('f_txtCli').value; }


    this.cargando = true;
    this.tservcicio.InsertGuia(eCab).then(res => {
      if (res == "ok") {
        this.cargando = false;
        this.bol_msj = true;
        this.msj_ok = "Se grabo el ingreso correctamente";
        
        setTimeout(() => {
          this.bol_msj = false;
          this.cargando = false;
          this.router.navigate(['docalmacen']);
        }, 2000);
      }
    }).catch(error => { this.ShowError(error) });



  }

  nuevoDocument() {
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + "-" + x.getDate();


    this.forma.reset({
      'f_cmbAlmacen': '005',
      'f_cmb_tipomov': 'I',
      'f_cmbDocRef': 'GI',
      'f_txtFecha': fechaReg,
      'f_rbAnexo': 'p',
      'f_cmbMoneda': 'PEN'
    });

    this.tservcicio.DeleteAllDetalles();
    this.tservcicio.DeleteItemDetallesIA(0);
    this.bol_msj = false;
    console.log(this.tservcicio.getDetallesIA);

  }

  imprimir() {
    window.print();
  }


  ShowError(err: string) {
    this.bol_msjErr = true;
    this.msjError = err;
    setTimeout(() => {
      this.bol_msjErr = false;
    }, 2000);
  }

}
