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
import { EMA_CREDITCARD } from '../../shared/modelos/EMA_CREDITCARD';
import { MA_SALESPOINT } from '../../shared/modelos/MA_SALESPOINT';
import { Router } from '@angular/router';
import { Ma_Lot } from '../../shared/modelos/Ma_Lot';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { Re_StockLote } from '../../shared/modelos/Re_StockLote';
import { EMA_CURRENCY_EXCHANGE } from '../../shared/modelos/EMA_CURRENCY_EXCHANGE';
import { EMA_CONFIGGEN } from '../../shared/modelos/EMA_CONFIGGEN';

declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-comprobante',
    templateUrl: './comprobante.component.html',
    styleUrls: ['./comprobante.component.css']
    // styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]

})

export class ComprobanteComponent {
    forma: FormGroup;
    frmDet: FormGroup;
    eDetalles: Ms_DetComprotmp[];
    eMonedas: Ma_Moneda[] = [];
    eMonedasPago: Ma_Moneda[] = [];
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
    eTarjetas: EMA_CREDITCARD[] = [];
    eLotes: Ma_Lot[] = [];

    cargando: boolean = false;
    bol_cargando: boolean = false;
    bol_msj: boolean = false;
    bol_msjError: boolean = false;
    bol_lisdet: boolean = true;
    ptoVta: string = 'P01';
    docGuia: string = 'GSA';
    IdAlmacen: string = '';
    msjError: string = '';
    msj_ok: string = '';
    tc: number = 0.0;

    totDet: number = 0;
    subtotalDet: number = 0;
    igvDet: number = 0;
    preiva: boolean = false;

    display = 'none';

    constructor(
        private mservicio: MaestrosService,
        private vservicio: VentasService,
        private traServicio: TransaccionesService,
        private router: Router
    ) {


        //cargamos el almacen con el cod de pto vta
        this.mservicio.getPuntoVenta(this.ptoVta).then(
            (data: MA_SALESPOINT) => this.IdAlmacen = data.SP_IDWAREHOUSE
        );

        //cargamos el tipo de cambio
        let fec = new Date();
        console.log('fecha javascript:', fec);

        this.mservicio.getTipoCambiosporFecha(fec.getFullYear(), fec.getMonth() + 1, fec.getDate())
            .then((res: EMA_CURRENCY_EXCHANGE) => {
                this.tc = res.SELL;
            }).catch(err => console.log('error en get tc: ', err));

        //cargamos los parametro de configuraciones : IVA,etc
        this.preiva = false;
        this.mservicio.getConfiguraciones().then(
            (res: EMA_CONFIGGEN) => {
                if (res.PRE_IVA === 'S') {
                    this.preiva = true;
                }
            }).catch(err => console.log('error en get configuraciones: ', err));


        //cargamos los combos    
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
            'VH_IDSALESTYPE': new FormControl('001'),
            'VH_IDWILCARD': new FormControl(''),
            'VH_COMMENT': new FormControl('', Validators.required),
            'VH_ISCASHCARD': new FormControl(''),
            'VH_CARDTYPE': new FormControl(''),
            'VH_OPENUMCARD': new FormControl(''),
            'VH_PAYAMOUNT': new FormControl(''),
            'VH_CHANGEAMOUNT': new FormControl(''),
            'VH_SUBTOT': new FormControl(''),
            'VH_TAX': new FormControl(''),
            'VH_TOT': new FormControl(''),
            'VH_IDCURREPAY': new FormControl('PEN')
        });



        this.frmDet = new FormGroup({
            'F_IDARTICULO': new FormControl('', Validators.required),
            'F_CODARTICULO': new FormControl(''),
            'F_DESARTICULO': new FormControl('', Validators.required),
            'F_UNIMED': new FormControl('', Validators.required),
            'F_CANTIDAD': new FormControl('', Validators.required),
            'F_PRECIO': new FormControl('', Validators.required),
            'F_TOTAL': new FormControl('', Validators.required),
            'F_ITEM': new FormControl(''),
            'f_chkEslote': new FormControl(''),
            'f_cmbLote': new FormControl(''),
            'f_txtStockLote': new FormControl(''),
            'F_IVA': new FormControl('')
        });


        //cargamos los documentos por PtoVenta
        this.mservicio.getDocxPtoVta(this.ptoVta).subscribe(
            (dat: MA_SALPOINTSERIE[]) => this.eDocumentos = dat);


        //obtenemos las series del documento GSA(guia de salida)
        this.mservicio.getSerieCorrelativo(this.ptoVta, this.docGuia).then(
            (dat: MA_SALPOINTSERIE[]) => this.eSerieNumerosGuia = dat
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

    abrirModalArticulos() {
        $('#detalleModal').modal();
    }

    cerrarModalClientes() {
        $('#myModalClientes').modal('hide');
    }

    getSeriesxDoc(doc: string) {
        this.forma.controls['VH_NDOC'].setValue('');
        this.mservicio.getSerieCorrelativo(this.ptoVta, doc).then(
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
        this.eMonedasPago = this.mservicio.getMonedas();

        this.mservicio.getFormaPagos().then(
            (dat: MA_PAYMENTTYPE[]) => this.eFormaPagos = dat
        );

        this.mservicio.getCentrocostos().then(
            (dat: Ma_Center_Cost[]) => this.eCentroCostos = dat
        );

        this.mservicio.getProyectos().then(
            (dat: MA_PROJECT[]) => this.eProyectos = dat
        );

        this.mservicio.getTipoVentas().then(
            (dat: MA_SALESTYPE[]) => this.eTipoVentas = dat
        );

        this.mservicio.getCommoditys().then(
            (dat: Ma_Commodity_Type[]) => this.eComodines = dat
        );

        this.mservicio.getVendedores().then(
            (dat: EMA_SELLER[]) => this.eVendedores = dat
        );

        this.mservicio.getTarjetasCredito().then(
            (dat: EMA_CREDITCARD[]) => this.eTarjetas = dat
        );
    }

    agregaItem() {

        if (!this.frmDet.get('F_CANTIDAD').valid) {
            return;
        }

        if (this.frmDet.get('f_chkEslote').value) {
            if (!this.frmDet.get('f_cmbLote').value) {
                alert("Seleccione un lote.");
                return;
            }
        }

        let id: number = this.frmDet.get('F_IDARTICULO').value;
        let des: string = this.frmDet.get('F_DESARTICULO').value;
        let uni: string = this.frmDet.get('F_UNIMED').value;
        let can: number = this.frmDet.get('F_CANTIDAD').value;
        let pre: number = this.frmDet.get('F_PRECIO').value;
        let tot: number = this.frmDet.get('F_TOTAL').value;
        let item: number = this.frmDet.get('F_ITEM').value;

        let eslote: boolean = this.frmDet.get('f_chkEslote').value;
        let numlote: string = this.frmDet.get('f_cmbLote').value;
        let iva: number = this.frmDet.get('F_IVA').value;

        if (item) {
            this.vservicio.setDetalleComprobante(new Ms_DetComprotmp(item, id, des, uni, can, pre, tot, 'A', '', 0, eslote, numlote, iva), true);
        } else {
            this.vservicio.setDetalleComprobante(new Ms_DetComprotmp(0, id, des, uni, can, pre, tot, 'A', '', 0, eslote, numlote, iva));
        }

        this.bol_lisdet = true;
        this.calcularTotales();
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

        this.frmDet.get('f_chkEslote').setValue(e.esLote);
        this.eLotes = [];
        if (e.esLote) {
            this.mservicio.getLotesxArticulo(e.codigo).then(
                (data: Ma_Lot[]) => {
                    this.eLotes = data;
                    this.frmDet.get('f_cmbLote').setValue(e.numlote);
                });
        }

        this.calcularTotales();
    }

    cancelarItem() {
        this.bol_lisdet = true;
    }

    eliminarItem(item: number) {
        this.vservicio.DeleteItemDetComprobante(item);
        this.calcularTotales();
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

        this.frmDet.get('f_chkEslote').setValue(false);
        this.eLotes = [];
        this.frmDet.get('f_cmbLote').setValue('');
        this.frmDet.get('f_txtStockLote').setValue('0');

        this.abrirModalArticulos();

    }

    calcularTotal() {
        let tot: number = 0;
        let can: number = this.frmDet.get('F_CANTIDAD').value;
        let pre: number = this.frmDet.get('F_PRECIO').value;
        tot = can * pre;
        this.frmDet.get('F_TOTAL').setValue(tot);
    }

    calcularVuelto() {
        let tot: number = 0;
        let pagado: number = this.forma.get('VH_PAYAMOUNT').value;
        let totdoc: number = this.totDet;// this.forma.get('VH_TOT').value;

        if (pagado < totdoc) {
            tot = 0;
        }
        else {
            tot = pagado - totdoc;
        }

        console.log(pagado);
        console.log(totdoc);
        console.log(tot);


        this.forma.get('VH_CHANGEAMOUNT').setValue(tot);
    }

    nuevoDocument() {
        this.vservicio.eComprobantesTmp.forEach(element => {
            console.log('iterando', element.total);
        });


        let x: Date = new Date();
        let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');
        this.forma.reset({
            'VH_VOUCHERDATE': fechaReg,
            'VH_DELIVERDATE': fechaReg, 'VH_IDCURRENCY': 'PEN'
        });
        this.frmDet.reset();
        this.vservicio.DeleteAllDetalles();
    }

    validaDocumento() {

        if (!this.forma.valid) {
            this.msjError = 'Falta ingresar informacion';
            this.bol_msjError = true;
            setTimeout(() => { this.bol_msjError = false }, 2000);
            return;
        }

        //revisamos si hay articulo con lote que no tenga lote ingresado
        // let bol_lotesOk: boolean = true;
        this.vservicio.eComprobantesTmp.forEach(element => {
            if (element.esLote) {
                if (!element.numlote) {
                    this.msjError = 'Falta ingresar el lote para el articulo: ' + element.articulo + ' en el item N° ' + element.item;
                    this.bol_msjError = true;
                    setTimeout(() => { this.bol_msjError = false }, 2000);
                    return;
                }
            }
        });

        if (this.bol_msjError) { return; }

        if (!this.forma.get('VH_PAYAMOUNT').value) {
            swal({
                title: "Desea continuar?",
                text: "Falta el monto cobrado.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((res) => {
                    if (res) {
                        this.grabarDocumento();
                        //alert('grabando desde pues de confirmar...')
                        return;
                        //alert('grabando2222...')
                    } else {
                        return;
                    }
                });
        } else {
            this.grabarDocumento();
            //alert('grabando desdepues del else...')
        }



    }

    grabarDocumento() {


        this.cargando = true;

        //Actualizar el correlativo de la guia de salida VH_GSSER
        let serieGuia = this.forma.get('VH_GSSER').value
        let serieCompro = this.forma.get('VH_SDOC').value
        let tipoCompro = this.forma.get('VH_TDOC').value

        this.mservicio.getSerieCorrelativo(this.ptoVta, this.docGuia).then(
            (dat: MA_SALPOINTSERIE[]) => {
                dat.forEach(element => {
                    if (element.SS_SERIE == serieGuia) {
                        this.forma.controls['VH_GSNUM'].setValue((element.SS_INITCORRE + 1).toString().padStart(8, '0'));
                    }
                });

                //encadenamos la actualizacion del correlativo del comprobante
                this.mservicio.getSerieCorrelativo(this.ptoVta, tipoCompro).then(
                    (data: MA_SALPOINTSERIE[]) => {
                        data.forEach(elem => {
                            if (elem.SS_SERIE == serieCompro) {
                                this.forma.controls['VH_NDOC'].setValue((elem.SS_INITCORRE + 1).toString().padStart(8, '0'));
                            }
                        });

                        //comenzamos a grabar 
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
                        eCab.VH_SUBTOT = this.subtotalDet; //this.forma.get('VH_SUBTOT').value;
                        eCab.VH_TAX = this.igvDet;//this.forma.get('VH_TAX').value;
                        eCab.VH_TOT = this.totDet; //this.forma.get('VH_TOT').value;
                        eCab.VH_ISTATUS = 'E';
                        eCab.VH_ACTIVE = 'A';
                        eCab.VH_AUSUARIO = '';
                        eCab.VH_AFECREG = '';
                        eCab.VH_AMODIFICO = '';
                        eCab.VH_AFECMOD = '';
                        eCab.VH_IDCOMPANY = 0;
                        eCab.VH_IDSALESPOINT = this.ptoVta;
                        eCab.CUREXCHANGE = this.tc;
                        eCab.VH_IDCURREPAY = this.forma.get('VH_IDCURREPAY').value;

                        this.vservicio.InsertComprobante(eCab).then(
                            res => {
                                if (res == "ok") {
                                    this.cargando = false;
                                    this.bol_msj = true;
                                    this.msj_ok = "se grabo el comprobante correctamente";
                                    setTimeout(() => {
                                        this.bol_msj = false
                                        swal('Numero de ' + eCab.VH_TDOC + ' :' + eCab.VH_SDOC + ' - ' + eCab.VH_NDOC, { icon: "success", });

                                        $('#modalReporte').modal();

                                        // this.router.navigate(['/comprobantes']);
                                    }, 1500);
                                }
                            }
                        ).catch(err => {
                            this.msjError = 'Error al intentar grabar el comprobante. ' + err;
                            this.bol_msjError = true;
                            this.cargando = false;
                            setTimeout(() => { this.bol_msjError = false }, 2000);
                        });

                    }).catch(errCorrCOM => {
                        this.msjError = 'Error al intentar actualizar el correlativo del comprobante. ' + errCorrCOM;
                        this.bol_msjError = true;
                        this.cargando = false;
                        setTimeout(() => { this.bol_msjError = false }, 2000);
                    });
            }
        ).catch(errCorrGS => {
            this.msjError = 'Error al intentar actualizar el correlativo de la GS. ' + errCorrGS;
            this.bol_msjError = true;
            this.cargando = false;
            setTimeout(() => { this.bol_msjError = false }, 2000);
        });

    }

    imprimir() {

        this.vservicio.setTicket(
            this.forma.get('VH_DESCUSTOMER').value,
            this.forma.get('VH_CODCUSTOMER').value,
            this.forma.get('VH_DELIVERYADD').value,
            this.forma.get('VH_TDOC').value,
            this.forma.get('VH_SDOC').value,
            this.forma.get('VH_NDOC').value,
            this.forma.get('VH_ISCASHCARD').value,
            this.forma.get('VH_PAYAMOUNT').value,
            this.forma.get('VH_CHANGEAMOUNT').value,

            this.subtotalDet,
            this.igvDet,
            this.totDet
        );


        

        this.router.navigate(['/ticket']);
    }

    HelpBuscarClientes(patron: any) {
        this.mservicio.getClientesxNombre(patron.value)
            .then((resp: Ma_Customer[]) => { this.eClientes = resp; });
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
        this.mservicio.getArticuloxNombre(patron.value)
            .then((resp: Ma_Article[]) => { this.eArticulos = resp });
    }

    HelpCargarArticulo(idArt: number) {
        this.eArticulos.forEach(element => {
            if (element.ID_ARTICLE == idArt) {
                this.frmDet.controls['F_IDARTICULO'].setValue(element.ID_ARTICLE);
                this.frmDet.controls['F_DESARTICULO'].setValue(element.DESCRIPTION_ARTICLE);
                this.frmDet.controls['F_UNIMED'].setValue(element.ID_UNIT);
                this.frmDet.controls['F_IVA'].setValue(element.IVA);

                this.frmDet.controls['f_chkEslote'].setValue(false);
                if (element.SKU_ARTICLE == '1') {
                    this.frmDet.controls['f_chkEslote'].setValue(true);
                    this.mservicio.getLotesxArticulo(idArt).then((data: Ma_Lot[]) => { this.eLotes = data });
                }

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
                    resolve(dat);
                },
                err => reject(err)
            );
        });

        promesaCargarPedido.then(
            (dat: ERE_VISTAPEDIDODET[]) => {
                dat.forEach(element => {
                    appx.vservicio.setDetalleComprobante(
                        new Ms_DetComprotmp(appx.vservicio.getComprobantes.length,
                            element.IDARTICULO, element.ARTICULO, element.UNIDAD,
                            element.CANTIDADDES, element.PRECIO, element.TOTAL, 'A',
                            '', element.IDORDER, element.ESLOTE == '1' ? true : false, '', 18));
                });
                this.calcularTotales();
            });
    }


    calcularTotales() {

        this.totDet = 0;
        this.subtotalDet = 0;
        this.igvDet = 0;

        let xtot = 0;
        let xigv = 0;
        let xsub = 0;
        let iva = 18;

        this.vservicio.eComprobantesTmp.forEach(element => {
            xtot = element.total;
            iva = element.iva;

            if (this.preiva) //incluye igv
            {
                xsub = xtot / ((iva / 100) + 1);//1.18
                xigv = xtot - xsub;
            } else {
                xsub = xtot;
                xigv = xsub * (iva / 100); //0.18
                xtot = xsub + xigv;
            }

            this.totDet += xtot;
            this.subtotalDet += xsub;
            this.igvDet += xigv;

        });

        this.totDet = roundNumber(this.totDet, 2);
        this.subtotalDet = roundNumber(this.subtotalDet, 2);
        this.igvDet = roundNumber(this.igvDet, 2);

    }

    buscarClintexDocumento(numero: string) {
        this.vservicio.getClientexNumDoc(numero).subscribe(
            (dato: Ma_Customer) => {
                if (dato) {
                    this.forma.get('VH_IDCUSTOMER').setValue(dato.ID_CUSTOMER);
                    this.forma.get('VH_CODCUSTOMER').setValue(dato.NUMBER_DOCUMENT);
                    this.forma.get('VH_DESCUSTOMER').setValue(dato.DESCRIPTION_CUSTOMER);
                    this.forma.get('VH_DELIVERYADD').setValue(dato.DELIVERY_ADDRESS);
                    this.forma.get('VH_IDSELLER').setValue(dato.SALES_CODE);
                } else {
                    this.forma.get('VH_IDCUSTOMER').setValue("");
                    this.forma.get('VH_CODCUSTOMER').setValue("");
                    this.forma.get('VH_DESCUSTOMER').setValue("");
                    this.forma.get('VH_DELIVERYADD').setValue("");
                    this.forma.get('VH_IDSELLER').setValue("");
                }
            }
        );
    }

    cambioLote(lote) {
        //buscamos stock por lote
        let idArt: number = 0;
        idArt = this.frmDet.get('F_IDARTICULO').value;
        this.traServicio.getStockxLote(idArt, this.IdAlmacen, lote)
            .subscribe((dat: Re_StockLote) => {
                if (dat) {
                    this.frmDet.controls['f_txtStockLote'].setValue(dat.QTY);
                }
                else { this.frmDet.controls['f_txtStockLote'].setValue(0) }

            }, eer => console.log(eer)
            );
    }

}




function roundNumber(number, precision): number {
    precision = Math.abs(parseInt(precision)) || 0;
    var multiplier = Math.pow(10, precision);
    return (Math.round(number * multiplier) / multiplier);
}