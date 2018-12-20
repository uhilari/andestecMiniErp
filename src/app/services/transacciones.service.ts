import { Injectable } from '@angular/core';
import { tra_DetalleIA } from '../components/shared/modelos/Tra_DetalleIA';
import { Tra_Guiaing } from '../components/shared/modelos/Tra_Guiaing';
import { Tra_Warehouse_Line } from '../components/shared/modelos/Tra_Warehouse_Line';
import { Tra_Warehouse } from '../components/shared/modelos/Tra_Warehouse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppGlobals } from '../components/shared/modelos/app.global';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  eDetalleIA: tra_DetalleIA[] = [];
  gIdEmpresa: number = 0;
  gApiURL: string = '';
  gUsuario: string = '';
  tmpCodAlmacen: string;


  constructor(private http: HttpClient, private appglo: AppGlobals) {
    this.gApiURL = this.appglo.baseAPIUrl;
    this.gIdEmpresa = this.appglo.baseAppEmpresa;
    this.gUsuario = this.appglo.baseAppUsuario;
    console.log("servicio transacciones listo para usarse!!");
  }

  agregarDetallesPrueba() {
    this.eDetalleIA.push(new tra_DetalleIA(1, 2, "lapttop xs TRR 244gh", "UNI", "LOT44", 4, "protocolo", "bultos", 150, "analisisis", "", "", ""));
    this.eDetalleIA.push(new tra_DetalleIA(2, 3, "mouse optioc lg", "UNI", "LOT100", 20, "protocolo", "bultos", 150, "analisisis", "", "", ""));
    this.eDetalleIA.push(new tra_DetalleIA(3, 6, "impresora laserJet 140", "UNI", "LOT001", 23, "protocolo", "bultos", 150, "analisisis", "", "", ""));
    this.eDetalleIA.push(new tra_DetalleIA(4, 11, "servidor hp 5540", "UNI", "", 6, "protocolo", "bultos", 150, "analisisis", "", "", ""));
  }

  getDetallesIA() {
    return this.eDetalleIA;
  }

  setDetalleIA(ent: tra_DetalleIA) {
    let numItem: number = this.eDetalleIA.length;
    this.eDetalleIA.push(new tra_DetalleIA(numItem + 1, ent.codigo, ent.articulo,
      ent.unidad, ent.lote, ent.cantidad, ent.protocolo, ent.bultos, ent.costo,
      ent.nanalisis, ent.procedencia, ent.paisori, ent.glosa));
  }

  DeleteItemDetallesIA(item: number) {
    this.eDetalleIA = this.eDetalleIA.filter(listadata => {
      return listadata.item != item
    });

    let i: number = 1;
    this.eDetalleIA.forEach(element => {
      element.item = i; i++;
    });

  }

  DeleteAllDetalles() {
    this.eDetalleIA = [];
  }


  InsertGuia(eCab: Tra_Warehouse): Promise<any> {
    let eDets = new Array<Tra_Warehouse_Line>();
    let fechaReg: string = eCab.TRANSACTION_DATE;

    eCab.ID_COMPANY = this.gIdEmpresa;
    eCab.AFECREG = fechaReg;
    eCab.AUSUARIO = this.gUsuario;
    eCab.AMODIFICO = this.gUsuario;
    eCab.AFECMOD = fechaReg;

    this.eDetalleIA.forEach(e => {
      eDets.push(new
        Tra_Warehouse_Line(this.gIdEmpresa, 1, eCab.ID_WAREHOUSE, e.item, e.codigo,
          e.articulo, e.lote, '', e.cantidad, e.costo, e.glosa, 1, this.gUsuario,
          fechaReg, this.gUsuario, fechaReg))
    });

    let eGuia = new Tra_Guiaing(eCab, eDets);

    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "TRA_WAREHOUSE";
      let body = JSON.stringify(eGuia);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe((r: string) => {
          resolver(r);
        }, error => {
          rechazar();
        }
        );

    });

  }

  //Reportes
  //controlador : TRA_WAREHOUSE - action : ERE_LISTA01
  getRepListado01(alm: string, ayo: number, mes: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + `TRA_WAREHOUSE/${this.gIdEmpresa}/${alm}/${ayo}/${mes}/documentos`)
        .subscribe((r: string) => resolver(r), error => rechazar());
    });
  }
  getRepListado02(alma: string) { return this.http.get(this.gApiURL + 'TRA_WAREHOUSE/' + this.gIdEmpresa + '/stock/' + alma); }
  getRepListado03(idarti: number) { return this.http.get(this.gApiURL + 'TRA_WAREHOUSE/' + this.gIdEmpresa + '/stock/detalle/' + idarti); }
  getRepListado04(idtrans: number) { return this.http.get(this.gApiURL + 'TRA_WAREHOUSE/' + this.gIdEmpresa + '/vistacab/' + idtrans); }
  getRepListado05(idtrans: number) { return this.http.get(this.gApiURL + 'TRA_WAREHOUSE/vistadet/' + idtrans); }
  getRepListado06(idtrans: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'TRA_WAREHOUSE/' + this.gIdEmpresa + '/vista/' + idtrans)
        .subscribe((r: string) => resolver(r), error => rechazar());
    });
  }

  //Stock
  getStockxArti(idarticulo: number, idalmacen: string) { return this.http.get(this.gApiURL + 'TRA_WAREHOUSE_QTY/' + this.gIdEmpresa + '/' + idarticulo + '/' + idalmacen); }
  getStockxLote(idarticulo: number, idalmacen: string, lote: string) { return this.http.get(this.gApiURL + 'TRA_WAREHOUSE_QTY/' + this.gIdEmpresa + '/' + idarticulo + '/' + idalmacen + '/' + lote); }
  getStockTotalxLote(idarticulo: number, idalmacen: string) { return this.http.get(this.gApiURL + 'TRA_WAREHOUSE_QTY/lote/' + this.gIdEmpresa + '/' + idarticulo + '/' + idalmacen); }



}

