import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';
import { MA_SALPOINTSERIE } from '../../shared/modelos/MA_SALPOINTSERIE';
import { Ms_DetComprotmp } from '../../shared/modelos/Ms_DetComprotmp';
import { MS_VOUCHERHE } from '../../shared/modelos/MS_VOUCHERHE';
import { ERE_LISTADOPEDIDOAYU } from '../../shared/modelos/ERE_LISTADOPEDIDOAYU';
import { ERE_VISTAPEDIDODET } from '../../shared/modelos/ERE_VISTAPEDIDODET';


declare var $: any;

@Component({
    selector: 'app-comprobante',
    templateUrl: './comprobante.component.html',
    styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})



export class ComprobanteComponent {
    forma: FormGroup;
    frmDet: FormGroup;
    eDetalles: Ms_DetComprotmp[];
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
    eSerieNumerosGuia: MA_SALPOINTSERIE[];
    eDocumentos: MA_SALPOINTSERIE[];
    ePedidosAyuda: ERE_LISTADOPEDIDOAYU[];
    eDetallePedidotmp: ERE_VISTAPEDIDODET[];

    cargando: boolean = false;
    bol_cargando: boolean = false;
    bol_msj: boolean = false;
    bol_msjError: boolean = false;
    bol_lisdet: boolean = true;
    ptoVta: string = 'P01';
    docGuia: string = 'GSA';
    msjError: string = '';

    totDet: number = 0;
    subtotalDet: number = 0;
    igvDet: number = 0;




    constructor(
        private mservicio: MaestrosService,
        private vservicio: VentasService
    ) {

        this.cargarCombos();

        //iniciamos el formulario

        this.vservicio.DeleteAllDetallesComprobante();

        let x: Date = new Date();
        let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');

        this.forma = new FormGroup({
            'VH_TDOC': new FormControl('', Validators.required),
            'VH_SDOC': new FormControl('', Validators.required),
            'VH_NDOC': new FormControl('', Validators.required),
            'VH_IDORDER': new FormControl('0'),
            'VH_IDGUIDE': new FormControl('0'),
            'VH_GSSER': new FormControl('000'),
            'VH_GSNUM': new FormControl('000'),
            'VH_VOUCHERDATE': new FormControl(fechaReg, Validators.required),
            'VH_DELIVERDATE': new FormControl(fechaReg, Validators.required),
            'VH_IDSELLER': new FormControl(''),
            'VH_IDCURRENCY': new FormControl('PEN', Validators.required),
            'VH_IDCUSTOMER': new FormControl('', Validators.required),
            'VH_CODCUSTOMER': new FormControl('', Validators.required),
            'VH_DESCUSTOMER': new FormControl('', Validators.required),
            'VH_DELIVERYADD': new FormControl('', Validators.required),
            'VH_IDPAYMENTTYPE': new FormControl(''),
            'VH_IDCENCOST': new FormControl(''),
            'VH_IDPROJECT': new FormControl(''),
            'VH_IDSALESTYPE': new FormControl(''),
            'VH_IDWILCARD': new FormControl(''),
            'VH_COMMENT': new FormControl('', Validators.required),
            'VH_ISCASHCARD': new FormControl(''),
            'VH_CARDTYPE': new FormControl(''),
            'VH_OPENUMCARD': new FormControl(''),
            'VH_PAYAMOUNT': new FormControl(''),
            'VH_CHANGEAMOUNT': new FormControl(''),
            'VH_SUBTOT': new FormControl(''),
            'VH_TAX': new FormControl(''),
            'VH_TOT': new FormControl('')
        });



        this.frmDet = new FormGroup({
            'F_IDARTICULO': new FormControl('', Validators.required),
            'F_CODARTICULO': new FormControl(''),
            'F_DESARTICULO': new FormControl('', Validators.required),
            'F_UNIMED': new FormControl('', Validators.required),
            'F_CANTIDAD': new FormControl('', Validators.required),
            'F_PRECIO': new FormControl('', Validators.required),
            'F_TOTAL': new FormControl('', Validators.required),
            'F_ITEM': new FormControl('')
        });


        //cargamos los documentos por PtoVenta
        this.mservicio.getDocxPtoVta(this.ptoVta).subscribe(
            (dat: MA_SALPOINTSERIE[]) => this.eDocumentos = dat);


        //obtenemos las series del documento GSA(guia de salida)
        this.mservicio.getSerieCorrelativo(this.ptoVta, this.docGuia).subscribe(
            (dat: MA_SALPOINTSERIE[]) => {
                this.eSerieNumerosGuia = dat;
            }
        );
        this.forma.controls['VH_GSSER'].setValue(0);

    }

    abrirModalBuscarOrdenes() {
        let codigotmp: string = this.forma.get('VH_IDCUSTOMER').value;

        if (!codigotmp) {
            this.msjError = 'Seleccione un cliente para buscar pedidos';
            this.bol_msjError = true;
            setTimeout(() => { this.bol_msjError = false }, 2000);
            return;
        }

        this.vservicio.getPedidosAyuda(parseInt(codigotmp)).subscribe(
            (dat: ERE_LISTADOPEDIDOAYU[]) => { this.ePedidosAyuda = dat }
        );

        $('#ModalBuscarPedidos').modal();
    }

    abrirModalClientes() {
        $('#myModalClientes').modal();
    }

    cerrarModalClientes() {
        $('#myModalClientes').modal('hide');
    }


    getSeriesxDoc(doc: string) {
        this.forma.controls['VH_NDOC'].setValue('');
        this.mservicio.getSerieCorrelativo(this.ptoVta, doc).subscribe(
            (dat: MA_SALPOINTSERIE[]) => {
                this.eSerieNumeros = dat;
                this.forma.controls['VH_SDOC'].setValue(0);
            }
        );
    }

    getCorrelativo(ser: string) {
        this.eSerieNumeros.forEach(element => {
            if (element.SS_SERIE == ser) {
                this.forma.controls['VH_NDOC'].setValue((element.SS_INITCORRE + 1).toString().padStart(8, '0'));
            }
        });
    }

    getCorrelativoGuia(ser: string) {
        this.eSerieNumerosGuia.forEach(element => {
            if (element.SS_SERIE == ser) {
                this.forma.controls['VH_GSNUM'].setValue((element.SS_INITCORRE + 1).toString().padStart(8, '0'));
            }
        });
    }


    cargarCombos() {
        this.eMonedas = this.mservicio.getMonedas();

        this.mservicio.getFormaPagos().subscribe(
            (dat: MA_PAYMENTTYPE[]) => { this.eFormaPagos = dat }
        );

        this.mservicio.getCentrocostos().subscribe(
            (dat: Ma_Center_Cost[]) => { this.eCentroCostos = dat }
        );

        this.mservicio.getProyectos().subscribe(
            (dat: MA_PROJECT[]) => { this.eProyectos = dat }
        );

        this.mservicio.getTipoVentas().subscribe(
            (dat: MA_SALESTYPE[]) => { this.eTipoVentas = dat }
        );

        this.mservicio.getCommoditys().subscribe(
            (dat: Ma_Commodity_Type[]) => { this.eComodines = dat }
        );

        this.mservicio.getVendedores().subscribe(
            (dat: EMA_SELLER[]) => { this.eVendedores = dat }
        );
    }

    agregaItem() {

        if (!this.frmDet.get('F_CANTIDAD').valid) {
            return;
        }

        let id: number = this.frmDet.get('F_IDARTICULO').value;
        let des: string = this.frmDet.get('F_DESARTICULO').value;
        let uni: string = this.frmDet.get('F_UNIMED').value;
        let can: number = this.frmDet.get('F_CANTIDAD').value;
        let pre: number = this.frmDet.get('F_PRECIO').value;
        let tot: number = this.frmDet.get('F_TOTAL').value;
        let item: number = this.frmDet.get('F_ITEM').value;

        if (item) {
            this.vservicio.setDetalleComprobante(new Ms_DetComprotmp(item, id, des, uni, can, pre, tot, 'A', '', 0), true);
        } else {
            this.vservicio.setDetalleComprobante(new Ms_DetComprotmp(0, id, des, uni, can, pre, tot, 'A', '', 0));
        }

        this.bol_lisdet = true;

    }

    editarItem(item: number) {
        this.bol_lisdet = false;
        this.frmDet.get('F_IDARTICULO').setValue('');
        this.frmDet.get('F_DESARTICULO').setValue('');
        this.frmDet.get('F_UNIMED').setValue('');
        this.frmDet.get('F_CANTIDAD').setValue('0');
        this.frmDet.get('F_PRECIO').setValue('0');
        this.frmDet.get('F_TOTAL').setValue('0');
        this.frmDet.get('F_ITEM').setValue(item);
        console.log('item a editar es:', item);

        let e = this.vservicio.seleccionarItemComprobante(item);

        this.frmDet.get('F_IDARTICULO').setValue(e.codigo);
        this.frmDet.get('F_DESARTICULO').setValue(e.articulo);
        this.frmDet.get('F_UNIMED').setValue(e.unidad);
        this.frmDet.get('F_CANTIDAD').setValue(e.cantidad);
        this.frmDet.get('F_PRECIO').setValue(e.preunit);
        this.frmDet.get('F_TOTAL').setValue(e.total);
        this.frmDet.get('F_ITEM').setValue(e.item);

    }

    cancelarItem() {
        this.bol_lisdet = true;
    }
    eliminarItem(item: number) {
        this.vservicio.DeleteItemDetComprobante(item);
    }
    nuevoDet() {
        this.bol_lisdet = false;
        this.frmDet.get('F_IDARTICULO').setValue('');
        this.frmDet.get('F_DESARTICULO').setValue('');
        this.frmDet.get('F_UNIMED').setValue('');
        this.frmDet.get('F_CANTIDAD').setValue('0');
        this.frmDet.get('F_PRECIO').setValue('0');
        this.frmDet.get('F_TOTAL').setValue('0');
        this.frmDet.get('F_ITEM').setValue('');
    }

    calcularTotal() {
        let tot: number = 0;
        let can: number = this.frmDet.get('F_CANTIDAD').value;
        let pre: number = this.frmDet.get('F_PRECIO').value;
        tot = can * pre;
        this.frmDet.get('F_TOTAL').setValue(tot);
    }


    nuevoDocument() { }


    grabarDocumento() {

        if (!this.forma.valid) {
            this.msjError = 'Falta ingresar informacion';
            this.bol_msjError = true;
            setTimeout(() => { this.bol_msjError = false }, 2000);
            return;
        }



        let fecTrans = this.forma.get('VH_VOUCHERDATE').value;
        fecTrans = fecTrans.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');


        let eCab = new MS_VOUCHERHE();
        eCab.VH_IDVOUCHER = 0;
        eCab.VH_TDOC = this.forma.get('VH_TDOC').value;
        eCab.VH_SDOC = this.forma.get('VH_SDOC').value;
        eCab.VH_NDOC = this.forma.get('VH_NDOC').value;
        eCab.VH_IDORDER = this.forma.get('VH_IDORDER').value;
        eCab.VH_IDGUIDE = this.forma.get('VH_IDGUIDE').value;
        eCab.VH_GSSER = this.forma.get('VH_GSSER').value;
        eCab.VH_GSNUM = this.forma.get('VH_GSNUM').value;

        eCab.VH_VOUCHERDATE = this.forma.get('VH_VOUCHERDATE').value;
        eCab.VH_DELIVERDATE = this.forma.get('VH_DELIVERDATE').value;
        eCab.VH_IDSELLER = this.forma.get('VH_IDSELLER').value;
        eCab.VH_IDCURRENCY = this.forma.get('VH_IDCURRENCY').value;
        eCab.VH_IDCUSTOMER = this.forma.get('VH_IDCUSTOMER').value;
        eCab.VH_DELIVERYADD = this.forma.get('VH_DELIVERYADD').value;
        eCab.VH_IDPAYMENTTYPE = this.forma.get('VH_IDPAYMENTTYPE').value;
        eCab.VH_IDCENCOST = this.forma.get('VH_IDCENCOST').value;
        eCab.VH_IDPROJECT = this.forma.get('VH_IDPROJECT').value;
        eCab.VH_IDSALESTYPE = this.forma.get('VH_IDSALESTYPE').value;
        eCab.VH_IDWILCARD = this.forma.get('VH_IDWILCARD').value;
        eCab.VH_COMMENT = this.forma.get('VH_COMMENT').value;

        eCab.VH_ISCASHCARD = this.forma.get('VH_ISCASHCARD').value;
        eCab.VH_CARDTYPE = this.forma.get('VH_CARDTYPE').value;
        eCab.VH_OPENUMCARD = this.forma.get('VH_OPENUMCARD').value;
        eCab.VH_PAYAMOUNT = this.forma.get('VH_PAYAMOUNT').value;
        eCab.VH_CHANGEAMOUNT = this.forma.get('VH_CHANGEAMOUNT').value;
        eCab.VH_SUBTOT = this.forma.get('VH_SUBTOT').value;
        eCab.VH_TAX = this.forma.get('VH_TAX').value;
        eCab.VH_TOT = this.forma.get('VH_TOT').value;


        eCab.VH_ISTATUS = 'E';
        eCab.VH_ACTIVE = 'A';
        eCab.VH_AUSUARIO = '';
        eCab.VH_AFECREG = '';
        eCab.VH_AMODIFICO = '';
        eCab.VH_AFECMOD = '';
        eCab.VH_IDCOMPANY = 0;

        this.vservicio.InsertComprobante(eCab);
        this.bol_msj = true;
        setTimeout(() => { this.bol_msj = false }, 3000);
    }

    imprimir() { window.print(); }

    HelpBuscarClientes(patron: any) {
        this.mservicio.getClientesxNombre(patron.value)
            .subscribe((resp: Ma_Customer[]) => {
                this.eClientes = resp;
            });
    }

    HelpCargarCliente(Idcliente: number) {
        this.eClientes.forEach(element => {
            if (element.ID_CUSTOMER == Idcliente) {
                this.forma.get('VH_IDCUSTOMER').setValue(element.ID_CUSTOMER);
                this.forma.get('VH_CODCUSTOMER').setValue(element.NUMBER_DOCUMENT);
                this.forma.get('VH_DESCUSTOMER').setValue(element.DESCRIPTION_CUSTOMER);
                this.forma.get('VH_DELIVERYADD').setValue(element.DELIVERY_ADDRESS);
                this.forma.get('VH_IDSELLER').setValue(element.SALES_CODE);
                this.forma.get('VH_IDPAYMENTTYPE').setValue(element.IDPAYMENTYPE);


                let dias: number = 0;

                this.eFormaPagos.forEach(ele => {
                    if (ele.PT_ID == element.IDPAYMENTYPE) {
                        dias = ele.PT_DAYS + 1;
                    }
                });


                var fecTmp = new Date(this.forma.get('VH_VOUCHERDATE').value);
                fecTmp.setDate(fecTmp.getDate() + dias);
                let fechaReady: string = fecTmp.getFullYear() + "-" + (fecTmp.getMonth() + 1).toString().padStart(2, '0') + '-' + fecTmp.getDate().toString().padStart(2, '0');
                this.forma.get('VH_DELIVERDATE').setValue(fechaReady);
            }

        });

    }


    HelpBuscarArticulos(patron: any) {
        let patron2: string = patron.value;
        if (patron.value == '') { patron2 = '@'; }

        this.mservicio.getArticuloxNombre(patron2)
            .subscribe((resp: Ma_Article[]) => {
                this.eArticulos = resp;
            });
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



    HelpBuscarPedidos(patron: any) {
        this.vservicio.getPedidosAyuda(patron.value).subscribe(
            (dat: ERE_LISTADOPEDIDOAYU[]) => { this.ePedidosAyuda = dat }
        );

    }


    //aqui llamamos a un api para traer los detalles del pedido y cargarlos al detalle
    HelpCargarPedido(idPedido: number) {
        let appx = this;
        let promesaCargarPedido = new Promise((resolve, reject) => {
            //Obtenemos la cabecera del pedido por IdPedido ........(falta).....
            //Obtenemos el detalle del pedido por IdPedido
            this.vservicio.getRepVistaPedidoDet(idPedido).subscribe(
                (dat: ERE_VISTAPEDIDODET[]) => {
                    appx.eDetallePedidotmp = dat;
                    dat.forEach(element => {
                        appx.vservicio.setDetalleComprobante(
                            new Ms_DetComprotmp(appx.vservicio.getComprobantes.length,
                                element.IDARTICULO, element.ARTICULO, element.UNIDAD,
                                element.CANTIDADDES, element.PRECIO, element.TOTAL, 'A',
                                '', element.IDORDER));
                    });
                }
            );
            console.log('ejecuta promesa');

            resolve(appx.vservicio.eComprobantesTmp);
        });

        
        promesaCargarPedido.then(
            function (value: Ms_DetComprotmp[]) {
                console.log('array devuelto: ', value);
            } ,
            function (reason) {
                console.log('ocurrio un error: ', reason);
            }
        );

    }



}

