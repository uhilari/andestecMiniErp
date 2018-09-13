import { Injectable } from '@angular/core';
import { Ms_DetOrdPedtmp } from '../components/shared/modelos/Ms_DetOrdPedtmp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMS_ORDERCAB } from '../components/shared/modelos/EMS_ORDERCAB';
import { EMS_ORDERDET } from '../components/shared/modelos/EMS_ORDERDET';
import { EMS_ORDER } from '../components/shared/modelos/EMS_ORDER';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  ePedidosTmp: Ms_DetOrdPedtmp[] = [];
  gIdEmpresa: number = 1;
  gApiURL: string = 'http://localhost:22900/';
  gUsuario: string = 'cbazan';

  constructor(private http: HttpClient) { }


  setDetalleOrden(e: Ms_DetOrdPedtmp) {
    let numItem: number = this.ePedidosTmp.length + 1;
    this.ePedidosTmp.push(new Ms_DetOrdPedtmp(numItem, e.codigo, e.articulo, e.unidad, e.cantidad, e.preunit, e.total, 'A'));
  }
  getDetalleOrden() {
    return this.ePedidosTmp;
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

  DeleteAllDetalles() {
    this.ePedidosTmp = [];
  }

  InsertOrden(eCab: EMS_ORDERCAB) {
    let eDets = new Array<EMS_ORDERDET>();
    let fechaReg: string = eCab.OC_DATEORDER;

    eCab.OC_IDCOMPANY = this.gIdEmpresa;
    eCab.OC_AFECREG = fechaReg;
    eCab.OC_AUSUARIO = this.gUsuario;
    eCab.OC_AMODIFICO = this.gUsuario;
    eCab.OC_AFECMOD = fechaReg;

    this.ePedidosTmp.forEach(e => {
      eDets.push(new EMS_ORDERDET(0, e.item, e.codigo, e.articulo, e.cantidad, e.preunit, e.total, e.estado, e.cantidad));
    });

    let eOrden = new EMS_ORDER(eCab, eDets);

    let apiURL: string = this.gApiURL + "MS_ORDERCAB";
    let body = JSON.stringify(eOrden);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }

  getPedidos() {
    return this.http.get(this.gApiURL + 'MS_ORDERCAB/' + this.gIdEmpresa + '/pedidos');
  }

}
