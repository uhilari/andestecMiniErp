import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ms_DetOrdPedtmp } from '../../shared/modelos/Ms_DetOrdPedtmp';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Moneda } from '../../shared/modelos/Ma_Moneda';
import { MA_PAYMENTTYPE } from '../../shared/modelos/MA_PAYMENTTYPE';
import { Ma_Center_Cost } from '../../shared/modelos/Ma_Center_Cost';
import { MA_PROJECT } from '../../shared/modelos/MA_PROJECT';
import { MA_SALESTYPE } from '../../shared/modelos/MA_SALESTYPE';
import { Ma_Commodity_Type } from '../../shared/modelos/Ma_Commodity_Type';
import { VentasService } from '../../../services/ventas.service';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { Ma_Article } from '../../shared/modelos/Ma_Article';
import { EMS_ORDERCAB } from '../../shared/modelos/EMS_ORDERCAB';
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';
import { MA_SALPOINTSERIE } from '../../shared/modelos/MA_SALPOINTSERIE';
import { MA_SALESPOINT } from '../../shared/modelos/MA_SALESPOINT';
import { Router } from '@angular/router';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-ordpedido',
  templateUrl: './ordpedido.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})

export class OrdpedidoComponent {

  forma: FormGroup;
  frmDet: FormGroup;
  eDetalles: Ms_DetOrdPedtmp[];
  eMonedas: Ma_Moneda[] = [];
  eFormaPagos: MA_PAYMENTTYPE[];
  eCentroCostos: Ma_Center_Cost[];
  eProyectos: MA_PROJECT[];
  eTipoVentas: MA_SALESTYPE[];
  eComodines: Ma_Commodity_Type[];
  eClientes: Ma_Customer[];
  eArticulos: Ma_Article[];
  eVendedores: EMA_SELLER[];
  eSerieNumeros: MA_SALPOINTSERIE[];
  cargando: boolean = false;
  bol_cargando: boolean = false;
  bol_msj: boolean = false;
  bol_lisdet: boolean = true;
  bol_msjError: boolean = false;
  ptoVta: string = 'P01';
  docPed: string = 'PDD';
  IdAlmacen: string = '';
  msjError: string = '';
  msj_ok: string = '';

  constructor(
    private mservicio: MaestrosService,
    private vservicio: VentasService,
    private router: Router) {

    //cargamos el almacen con el cod de pto vta
    this.mservicio.getPuntoVenta(this.ptoVta).then(
      (data: MA_SALESPOINT) => this.IdAlmacen = data.SP_IDWAREHOUSE
    );

    this.cargarCombos();

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');
    console.log(fechaReg);

    this.forma = new FormGroup({
      'OC_DATEORDER': new FormControl(fechaReg, Validators.required),
      'OC_DELIVERDATE': new FormControl(fechaReg, Validators.required),
      'OC_IDCURRENCY': new FormControl('PEN', Validators.required),
      'OC_IDCUSTOMER': new FormControl('', Validators.required),
      'OC_CODCUSTOMER': new FormControl('', Validators.required),
      'OC_DESCUSTOMER': new FormControl('', Validators.required),
      'OC_DELIVERYADD': new FormControl('', Validators.required),
      'OC_IDPAYMENTTYPE': new FormControl(''),
      'OC_IDCENCOST': new FormControl(''),
      'OC_IDPROJECT': new FormControl(''),
      'OC_IDSALESTYPE': new FormControl(''),
      'OC_IDWILCARD': new FormControl(''),
      'OC_COMMENT': new FormControl('', Validators.required),
      'OC_IDSELLER': new FormControl('', Validators.required),
      'OC_SERIE': new FormControl('', Validators.required),
      'OC_CORRE': new FormControl('', Validators.required),
      'OC_WILCARDTEXT': new FormControl('')
    });

    this.frmDet = new FormGroup({
      'F_IDARTICULO': new FormControl('', Validators.required),
      'F_CODARTICULO': new FormControl(''),
      'F_DESARTICULO': new FormControl(''),
      'F_UNIMED': new FormControl('', Validators.required),
      'F_CANTIDAD': new FormControl('', Validators.required),
      'F_PRECIO': new FormControl('', Validators.required),
      'F_TOTAL': new FormControl('', Validators.required)
    });

    this.mservicio.getSerieCorrelativo(this.ptoVta, this.docPed).then(
      (dat: MA_SALPOINTSERIE[]) => { this.eSerieNumeros = dat }
    );


  }

  cargarCombos() {
    this.eMonedas = this.mservicio.getMonedas();

    this.mservicio.getFormaPagos().then(
      (dat: MA_PAYMENTTYPE[]) => { this.eFormaPagos = dat }
    );

    this.mservicio.getCentrocostos().then(
      (dat: Ma_Center_Cost[]) => { this.eCentroCostos = dat }
    );

    this.mservicio.getProyectos().then(
      (dat: MA_PROJECT[]) => { this.eProyectos = dat }
    );

    this.mservicio.getTipoVentas().then(
      (dat: MA_SALESTYPE[]) => { this.eTipoVentas = dat }
    );

    this.mservicio.getCommoditys().then(
      (dat: Ma_Commodity_Type[]) => { this.eComodines = dat }
    );

    this.mservicio.getVendedores().then(
      (dat: EMA_SELLER[]) => { this.eVendedores = dat }
    );
  }

  agregaItem() {
    let id: number = this.frmDet.get('F_IDARTICULO').value;
    let des: string = this.frmDet.get('F_DESARTICULO').value;
    let uni: string = this.frmDet.get('F_UNIMED').value;
    let can: number = this.frmDet.get('F_CANTIDAD').value;
    let pre: number = this.frmDet.get('F_PRECIO').value;
    let tot: number = this.frmDet.get('F_TOTAL').value;

    this.vservicio.setDetalleOrden(new Ms_DetOrdPedtmp(0, id, des, uni, can, pre, tot, 'A'));
    this.bol_lisdet = true;
  }

  calcularTotal() {
    let tot: number = 0;
    let can: number = this.frmDet.get('F_CANTIDAD').value;
    let pre: number = this.frmDet.get('F_PRECIO').value;
    tot = can * pre;
    this.frmDet.get('F_TOTAL').setValue(tot);
  }

  getCorrelativo(ser: string) {
    this.eSerieNumeros.forEach(element => {
      if (element.SS_SERIE == ser) {
        this.forma.controls['OC_CORRE'].setValue((element.SS_INITCORRE + 1).toString().padStart(8, '0'));
      }
    });
  }

  cancelarItem() {
    this.bol_lisdet = true;
  }
  eliminarItem(item: number) {
    this.vservicio.DeleteItemDetOrden(item);
  }

  nuevoDet() {
    this.bol_lisdet = false;
    this.frmDet.get('F_IDARTICULO').setValue('');
    this.frmDet.get('F_DESARTICULO').setValue('');
    this.frmDet.get('F_UNIMED').setValue('');
    this.frmDet.get('F_CANTIDAD').setValue('0');
    this.frmDet.get('F_PRECIO').setValue('0');
    this.frmDet.get('F_TOTAL').setValue('0');
    $('#detalleModal').modal();
    (<HTMLInputElement>document.getElementById("txtpatronart")).focus();
  }


  buscarClintexDocumento(numero: string) {
    this.vservicio.getClientexNumDoc(numero).subscribe(
      (dato: Ma_Customer) => {
        if (dato) {
          this.forma.get('OC_IDCUSTOMER').setValue(dato.ID_CUSTOMER);
          this.forma.get('OC_CODCUSTOMER').setValue(dato.NUMBER_DOCUMENT);
          this.forma.get('OC_DESCUSTOMER').setValue(dato.DESCRIPTION_CUSTOMER);
          this.forma.get('OC_DELIVERYADD').setValue(dato.DELIVERY_ADDRESS);
          this.forma.get('OC_IDSELLER').setValue(dato.SALES_CODE);
        } else {
          this.forma.get('OC_IDCUSTOMER').setValue("");
          this.forma.get('OC_CODCUSTOMER').setValue("");
          this.forma.get('OC_DELIVERYADD').setValue("");
          this.forma.get('OC_IDSELLER').setValue("");
        }
      }
    );
  }

  nuevoDocument() {
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');
    this.forma.reset({ 'OC_DATEORDER': fechaReg, 'OC_DELIVERDATE': fechaReg, 'OC_IDCURRENCY': 'PEN' });
    this.frmDet.reset();
    this.vservicio.DeleteAllDetalles();
  }


  actualizaCorrelativo() {

    //para obtener el correlativo del documento
    let serieSel = this.forma.get('OC_SERIE').value;
    this.mservicio.getSerieCorrelativo(this.ptoVta, this.docPed).then(
      (dat: MA_SALPOINTSERIE[]) => {
        dat.forEach(element => {
          if (element.SS_SERIE == serieSel) {
            this.forma.controls['OC_CORRE'].setValue((element.SS_INITCORRE + 1).toString().padStart(8, '0'));
          }
        });
      });
  }

  grabarDocumento() {

    if (!this.forma.valid) {
      this.msjError = 'Falta ingresar informacion';
      this.bol_msjError = true;
      setTimeout(() => { this.bol_msjError = false }, 1500);
      return;
    }

    // this.actualizaCorrelativo();

    //para obtener el correlativo del documento
    let serieSel = this.forma.get('OC_SERIE').value;
    this.mservicio.getSerieCorrelativoRes(this.ptoVta, this.docPed, serieSel).then(
      (dat: string) => {
        this.forma.controls['OC_CORRE'].setValue(dat);


        let fecTrans = this.forma.get('OC_DATEORDER').value;
        fecTrans = fecTrans.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');

        let eCab = new EMS_ORDERCAB();
        eCab.OC_IDORDER = 0;
        eCab.OC_DATEORDER = this.forma.get('OC_DATEORDER').value;
        eCab.OC_DELIVERDATE = this.forma.get('OC_DELIVERDATE').value;
        eCab.OC_IDCURRENCY = this.forma.get('OC_IDCURRENCY').value;
        eCab.OC_IDCUSTOMER = this.forma.get('OC_IDCUSTOMER').value;
        eCab.OC_DELIVERYADD = this.forma.get('OC_DELIVERYADD').value;
        eCab.OC_IDPAYMENTTYPE = this.forma.get('OC_IDPAYMENTTYPE').value;
        eCab.OC_IDCENCOST = this.forma.get('OC_IDCENCOST').value;
        eCab.OC_IDPROJECT = this.forma.get('OC_IDPROJECT').value;
        eCab.OC_IDSALESTYPE = this.forma.get('OC_IDSALESTYPE').value;
        eCab.OC_IDWILCARD = this.forma.get('OC_IDWILCARD').value;
        eCab.OC_COMMENT = this.forma.get('OC_COMMENT').value;
        eCab.OC_IDSELLER = this.forma.get('OC_IDSELLER').value;
        eCab.OC_ISTATUS = 'E';
        eCab.OC_ACTIVE = 'A';
        eCab.OC_AUSUARIO = '';
        eCab.OC_AFECREG = '';
        eCab.OC_AMODIFICO = '';
        eCab.OC_AFECMOD = '';
        eCab.OC_IDCOMPANY = 0;
        eCab.OC_SERIE = this.forma.get('OC_SERIE').value;
        eCab.OC_CORRE = this.forma.get('OC_CORRE').value;
        eCab.OC_WILCARDTEXT = this.forma.get('OC_WILCARDTEXT').value;

        // console.log(this.forma.get('OC_IDPROJECT').value);
        // console.log(eCab.OC_IDPROJECT);

        this.cargando = true;
        this.vservicio.InsertOrden(eCab).then(
          res => {
            if (res == "ok") {
              this.cargando = false;
              this.bol_msj = true;
              this.msj_ok = "Se grabo el pedido correctamente.";
              setTimeout(() => {
                this.bol_msj = false;
                swal('Numero de Pedido Generado:' + eCab.OC_CORRE, { icon: "success", });
                this.router.navigate(['/pedidos']);
              }, 1500);
            }
          }
        ).catch(err => {
          this.msjError = err;
          this.bol_msjError = true;
          this.cargando = false;
          setTimeout(() => { this.bol_msjError = false }, 2000);
        });



      });

  }

  imprimir() { window.print(); }

  HelpBuscarClientes(patron: any) {
    this.mservicio.getClientesxNombre(patron.value)
      .then((resp: Ma_Customer[]) => { this.eClientes = resp; });
  }

  HelpCargarCliente(Idcliente: number) {
    this.eClientes.forEach(element => {
      if (element.ID_CUSTOMER == Idcliente) {
        this.forma.get('OC_IDCUSTOMER').setValue(element.ID_CUSTOMER);
        this.forma.get('OC_CODCUSTOMER').setValue(element.NUMBER_DOCUMENT);
        this.forma.get('OC_DESCUSTOMER').setValue(element.DESCRIPTION_CUSTOMER);
        this.forma.get('OC_DELIVERYADD').setValue(element.DELIVERY_ADDRESS);
        this.forma.get('OC_IDSELLER').setValue(element.SALES_CODE);
        this.forma.get('OC_IDPAYMENTTYPE').setValue(element.IDPAYMENTYPE);

      }
    });
  }


  HelpBuscarArticulos(patron: any) {
    this.mservicio.getArticuloxNombre(patron.value)
      .then((resp: Ma_Article[]) => { this.eArticulos = resp; });
  }

  HelpCargarArticulo(idArt: number) {
    this.eArticulos.forEach(element => {
      if (element.ID_ARTICLE == idArt) {
        this.frmDet.controls['F_IDARTICULO'].setValue(element.ID_ARTICLE);
        this.frmDet.controls['F_DESARTICULO'].setValue(element.DESCRIPTION_ARTICLE);
        this.frmDet.controls['F_UNIMED'].setValue(element.ID_UNIT);
      }
    });
  }




}




