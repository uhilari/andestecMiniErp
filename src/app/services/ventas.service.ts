import { Injectable } from '@angular/core';
import { Ms_DetOrdPedtmp } from '../components/shared/modelos/Ms_DetOrdPedtmp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMS_ORDERCAB } from '../components/shared/modelos/EMS_ORDERCAB';
import { EMS_ORDERDET } from '../components/shared/modelos/EMS_ORDERDET';
import { EMS_ORDER } from '../components/shared/modelos/EMS_ORDER';
import { Ms_DetComprotmp } from '../components/shared/modelos/Ms_DetComprotmp';
import { MS_VOUCHERHE } from '../components/shared/modelos/MS_VOUCHERHE';
import { MS_VOUCHERDE } from '../components/shared/modelos/MS_VOUCHERDE';
import { MS_VOUCHER } from '../components/shared/modelos/MS_VOUCHER';
import { AppGlobals } from '../components/shared/modelos/app.global';
import { ticket } from '../components/shared/modelos/ticket';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  gIdEmpresa: number = 0;
  gApiURL: string = '';
  gUsuario: string = '';


  ePedidosTmp: Ms_DetOrdPedtmp[] = [];
  eComprobantesTmp: Ms_DetComprotmp[] = [];
  eTicket: ticket;

  constructor(private http: HttpClient, private appglo: AppGlobals) {
    this.gApiURL = this.appglo.baseAPIUrl;
    this.gIdEmpresa = this.appglo.baseAppEmpresa;
    this.gUsuario = this.appglo.baseAppUsuario;

    this.eTicket = new ticket;
  }

  setTicket(cli: string, rucc: string, dire: string, td: string, sd: string, nd: string, tp: string, entre: number, vuel: number,
    subto: number, igvv: number, totall: number) {
    this.eTicket.cliente = cli;
    this.eTicket.ruc = rucc;
    this.eTicket.dir = dire;
    this.eTicket.tipdoc = td;
    this.eTicket.serdoc = sd;
    this.eTicket.numdoc = nd;
    this.eTicket.tippago = tp;
    this.eTicket.entregado = entre;
    this.eTicket.vuelto = vuel;
    this.eTicket.subtotal = subto;
    this.eTicket.igv = igvv;
    this.eTicket.total = totall;
  }

  getTicket(): ticket {
    return this.eTicket;
  }

  setDetalleComprobante(e: Ms_DetComprotmp, edit: boolean = false) {
    if (edit) {
      this.eComprobantesTmp.forEach(element => {
        if (element.item == e.item) {
          element.item = e.item;
          element.codigo = e.codigo;
          element.articulo = e.articulo;
          element.unidad = e.unidad;
          element.cantidad = e.cantidad;
          element.preunit = e.preunit;
          element.total = e.total;
          element.estado = e.estado;
          element.glosa = e.glosa;
          element.esLote = e.esLote;
          element.numlote = e.numlote;
          element.iva = e.iva;
          //element.idpedido = e.idpedido;
        }
      });
    }
    else {
      let numItem: number = this.eComprobantesTmp.length + 1;
      this.eComprobantesTmp.push(new Ms_DetComprotmp(numItem, e.codigo, e.articulo, e.unidad, e.cantidad, e.preunit, e.total, 'A', e.glosa, e.idpedido, e.esLote, e.numlote, e.iva));
    }


  }

  setDetalleOrden(e: Ms_DetOrdPedtmp) {
    let numItem: number = this.ePedidosTmp.length + 1;
    this.ePedidosTmp.push(new Ms_DetOrdPedtmp(numItem, e.codigo, e.articulo, e.unidad, e.cantidad, e.preunit, e.total, 'A'));
  }
  getDetalleOrden() {
    return this.ePedidosTmp;
  }
  getDetalleComprobante(): Ms_DetComprotmp[] {
    return this.eComprobantesTmp;
  }

  DeleteItemDetOrden(item: number) {
    this.ePedidosTmp = this.ePedidosTmp.filter(listadata => {
      return listadata.item != item
    });

    let i: number = 1;
    this.ePedidosTmp.forEach(element => {
      element.item = i; i++;
    });

  }

  seleccionarItemComprobante(itemf: number): Ms_DetComprotmp {
    return this.eComprobantesTmp.find(dat => dat.item == itemf);
  }

  DeleteItemDetComprobante(item: number) {
    this.eComprobantesTmp = this.eComprobantesTmp.filter(listadata => {
      return listadata.item != item
    });

    let i: number = 1;
    this.eComprobantesTmp.forEach(element => {
      element.item = i; i++;
    });

  }

  DeleteAllDetalles() {
    this.ePedidosTmp = [];
  }

  DeleteAllDetallesComprobante() {
    this.eComprobantesTmp = [];
  }

  InsertOrden(eCab: EMS_ORDERCAB): Promise<any> {
    let eDets = new Array<EMS_ORDERDET>();
    let fechaReg: string = eCab.OC_DATEORDER;

    eCab.OC_IDCOMPANY = this.gIdEmpresa;
    eCab.OC_AFECREG = fechaReg;
    eCab.OC_AUSUARIO = this.gUsuario;
    eCab.OC_AMODIFICO = this.gUsuario;
    eCab.OC_AFECMOD = fechaReg;

    this.ePedidosTmp.forEach(e => {
      eDets.push(new EMS_ORDERDET(0, e.item, e.codigo, e.articulo, e.cantidad, e.preunit, e.total, e.estado, 0));
    });
    let eOrden = new EMS_ORDER(eCab, eDets);


    return new Promise((resolver, rechazar) => {

      let apiURL: string = this.gApiURL + "MS_ORDERCAB";
      let body = JSON.stringify(eOrden);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe((r) => resolver(r)
          , error => rechazar(error));
    });

  }

  getClientexNumDoc(numero: string) {
    return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa + '/buscarDoc/' + numero);
  }
  getPedidos(ayo: number, mes: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MS_ORDERCAB/' + this.gIdEmpresa + '/pedidos/' + ayo + '/' + mes)
        .subscribe((r) => resolver(r), error => rechazar(error));
    });
  }
  getPedidosPendientes(search: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MS_ORDERCAB/' + this.gIdEmpresa + '/pedidos/pendientes')
        .subscribe((r) => resolver(r), error => rechazar(error));
    });
  }
  getPedidosAyuda(cliente: number) {
    return this.http.get(this.gApiURL + 'MS_ORDERCAB/' + this.gIdEmpresa + '/ayuda/' + cliente);
  }
  getRepVistaPedido(idorder: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MS_ORDERCAB/' + this.gIdEmpresa + '/vista/' + idorder)
        .subscribe((r) => resolver(r), error => rechazar(error));
    });
  }
  getRepVistaPedidoDet(idorder: number) {
    return this.http.get(this.gApiURL + 'MS_ORDERCAB/vista/afacturar/' + idorder);
  }




  //comprobantes_____________________________________________________________________________
  InsertComprobante(eCab: MS_VOUCHERHE): Promise<any> {

    let eDets = new Array<MS_VOUCHERDE>();
    let fechaReg: string = eCab.VH_VOUCHERDATE;

    eCab.VH_IDCOMPANY = this.gIdEmpresa;
    eCab.VH_AFECREG = fechaReg;
    eCab.VH_AUSUARIO = this.gUsuario;
    eCab.VH_AMODIFICO = this.gUsuario;
    eCab.VH_AFECMOD = fechaReg;

    this.eComprobantesTmp.forEach(e => {
      eDets.push(new MS_VOUCHERDE(0, e.item, e.codigo, e.articulo,
        e.cantidad, e.preunit, e.total, '', e.estado, e.idpedido, e.numlote, e.xigv, e.xsubt, e.xtot));
    });

    return new Promise((resolver, rechazar) => {
      let eComprobante = new MS_VOUCHER(eCab, eDets);
      let apiURL: string = this.gApiURL + "MS_VOUCHERHE";
      let body = JSON.stringify(eComprobante);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe((r) => resolver(r), error => rechazar(error));
    });
  }

  getComprobantes(ayo: number, mes: number): Promise<any> {
    console.log(ayo, mes);

    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MS_VOUCHERHE/' + this.gIdEmpresa + '/comprobantes/' + ayo + '/' + mes)
        .subscribe((r) => resolver(r), error => rechazar(error));
    });
  }

  getRepVistaComprobante(idorder: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MS_VOUCHERHE/' + this.gIdEmpresa + '/vista/' + idorder)
        .subscribe((r) => resolver(r), error => rechazar(error));
    });
  }



}
