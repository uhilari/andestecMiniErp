import { Injectable } from '@angular/core';
import { Ma_Warehouse } from '../components/shared/modelos/Ma_Warehouse';
import { Ma_Center_Cost } from '../components/shared/modelos/Ma_Center_Cost';
import { Ma_Family } from '../components/shared/modelos/MA_FAMILY';
import { Ma_Family_Sub } from '../components/shared/modelos/Ma_Family_Sub';
import { Ma_Commodity_Type } from '../components/shared/modelos/Ma_Commodity_Type';
import { Ma_Service } from '../components/shared/modelos/Ma_Service';
import { Ma_Unit } from '../components/shared/modelos/Ma_Unit';
import { Ma_Article } from '../components/shared/modelos/Ma_Article';
import { Ma_Customer } from '../components/shared/modelos/Ma_Customer';
import { Ma_TipDocPer } from '../components/shared/modelos/Ma_TipDocPer';
import { Ma_Provider } from '../components/shared/modelos/Ma_Provider';
import { Ma_TipoTransaccion } from '../components/shared/modelos/Ma_TipoTransaccion';
import { Ma_Moneda } from '../components/shared/modelos/Ma_Moneda';
import { Ma_DocTrans_Type } from '../components/shared/modelos/Ma_DocTrans_Type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ma_TipoMovimiento } from '../components/shared/modelos/Ma_TipoMovimiento';
import { Ma_Lot } from '../components/shared/modelos/Ma_Lot';


@Injectable({ providedIn: 'root' })

export class MaestrosService {

  gIdEmpresa: number = 1;
  gApiURL = 'http://localhost:22900/';
  gUsuario = 'cbazan';

  eAlmacen: Ma_Warehouse[] = [];
  eCentrocosto: Ma_Center_Cost[] = [];
  eFamilia: Ma_Family[] = [];
  eFamiliaSub: Ma_Family_Sub[] = [];
  eCommodity: Ma_Commodity_Type[] = [];
  eServicio: Ma_Service[] = [];
  eUnidad: Ma_Unit[] = [];
  eArticulo: Ma_Article[] = [];
  eCliente: Ma_Customer[] = [];
  eTipoDocPer: Ma_TipDocPer[] = [];
  eProveedor: Ma_Provider[] = [];
  eTipoTransaccion: Ma_TipoTransaccion[] = [];
  eTipoMovimiento: Ma_TipoMovimiento[] = [];
  eMonedas: Ma_Moneda[] = [];
  eDocumentos: Ma_DocTrans_Type[] = [];

  entAlma: Ma_Warehouse;

  constructor(private http: HttpClient) {
    console.log("servicio maestros listo para usarse!!");
  }

  getFechaActual(): string {
    let x: Date = new Date();
    let fechaReg: string = x.getDate() + "/" + (x.getMonth() + 1) + "/" + x.getFullYear();
    return fechaReg;
  }


  //Almacenes =================================================================
  getAlmacenes() { return this.http.get(this.gApiURL + 'MA_WAREHOUSE/' + this.gIdEmpresa); }
  getAlmacen(id: string) { return this.http.get(this.gApiURL + 'MA_WAREHOUSE/' + this.gIdEmpresa + '/' + id) }

  registrarAlmacen(ent: Ma_Warehouse) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_WAREHOUSE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }

  borrarAlmacen(id: string) {
    let apiURL: string = this.gApiURL + "MA_WAREHOUSE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //centro de costo ============================================================
  getCentrocostos() { return this.http.get(this.gApiURL + 'MA_CENTER_COST/' + this.gIdEmpresa); }
  getCentrocosto(id: string) { return this.http.get(this.gApiURL + 'MA_CENTER_COST/' + this.gIdEmpresa + '/' + id); }

  nuevoCentrocosto(ent: Ma_Center_Cost) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_CENTER_COST";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }

  borrarCentroCosto(id: string) {
    let apiURL: string = this.gApiURL + "MA_CENTER_COST/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }

  //Familias ___________________________________________________________________
  getFamilias() { return this.http.get(this.gApiURL + 'MA_FAMILY/' + this.gIdEmpresa); }
  getFamilia(id: string) { return this.http.get(this.gApiURL + 'MA_FAMILY/' + this.gIdEmpresa + '/' + id); }
  nuevaFamilia(ent: Ma_Family) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_FAMILY";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarFamilia(id: string) {
    let apiURL: string = this.gApiURL + "MA_FAMILY/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //[Familias Sub]  _______________________________________________________________
  getFamiliasSub() { return this.http.get(this.gApiURL + 'MA_FAMILY_SUB/' + this.gIdEmpresa); }
  getFamiliaSub(id: string) { return this.http.get(this.gApiURL + 'MA_FAMILY_SUB/' + this.gIdEmpresa + '/' + id); }
  nuevaFamiliaSub(ent: Ma_Family_Sub) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_FAMILY_SUB";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarSubFamilia(id: string) {
    let apiURL: string = this.gApiURL + "MA_FAMILY_SUB/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //[MA_COMMODITY_TYPE] _______________________________________________________________
  getCommoditys() { return this.http.get(this.gApiURL + 'MA_COMMODITY_TYPE/' + this.gIdEmpresa); }
  getCommodity(id: string) { return this.http.get(this.gApiURL + 'MA_COMMODITY_TYPE/' + this.gIdEmpresa + '/' + id); }
  nuevoCommodity(ent: Ma_Commodity_Type) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_COMMODITY_TYPE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarCommodity(id: string) {
    let apiURL: string = this.gApiURL + "MA_COMMODITY_TYPE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //[MA_SERVICES]__________________________________________________________________________________
  getServicios() { return this.http.get(this.gApiURL + 'MA_SERVICES/' + this.gIdEmpresa); }
  getServicio(id: string) { return this.http.get(this.gApiURL + 'MA_SERVICES/' + this.gIdEmpresa + '/' + id); }
  nuevoServicio(ent: Ma_Service) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_SERVICES";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarServicio(id: string) {
    let apiURL: string = this.gApiURL + "MA_SERVICES/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //[MA_UNITS]_____________________________________________________________________________________
  getUnidades() { return this.http.get(this.gApiURL + 'MA_UNITS/' + this.gIdEmpresa); }
  getUnidad(id: string) { return this.http.get(this.gApiURL + 'MA_UNITS/' + this.gIdEmpresa + '/' + id); }
  nuevaUnidad(ent: Ma_Unit) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_UNITS";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarUnidadMed(id: string) {
    let apiURL: string = this.gApiURL + "MA_UNITS/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //[MA_ARTICLE]______________________________________________________________________________________
  getArticulos() { return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa); }
  getArticulo(id: number) { return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa + '/' + id); }
  getArticuloxNombre(dato: string) { return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa + '/buscar/' + dato); }

  registrarArticulo(ent: Ma_Article) {
    ent.AUSUARIO = this.gUsuario;
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_ARTICLE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }

  borrarArticulo(id: number) {
    let apiURL: string = this.gApiURL + "MA_ARTICLE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //[MA_CUSTOMER]________________________________________________________________________________________
  getClientes() { return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa); }
  getCliente(id: number) { return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa + '/' + id); }
  getClientesxNombre(dato: string) { return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa + '/buscar/' + dato); }
  nuevoCliente(ent: Ma_Customer) {
    ent.AUSUARIO = this.gUsuario;
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_CUSTOMER";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }

  borrarCliente(id: number) {
    let apiURL: string = this.gApiURL + "MA_CUSTOMER/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  geteTipDocPers() {
    this.eTipoDocPer = [];
    this.eTipoDocPer.push(new Ma_TipDocPer("0", "DOC.TRIB.NO.DOM.SIN.RUC"));
    this.eTipoDocPer.push(new Ma_TipDocPer("1", "DOC. NACIONAL DE IDENTIDAD"));
    this.eTipoDocPer.push(new Ma_TipDocPer("4", "CARNET DE EXTRANJERIA"));
    this.eTipoDocPer.push(new Ma_TipDocPer("6", "REG. UNICO DE CONTRIBUYENTES"));
    this.eTipoDocPer.push(new Ma_TipDocPer("7", "PASAPORTE"));
    this.eTipoDocPer.push(new Ma_TipDocPer("A", "CED. DIPLOMATICA DE IDENTIDAD"));
    this.eTipoDocPer.push(new Ma_TipDocPer("B", "DOC.IDENT.PAIS.RESIDENCIA-NO.D"));
    this.eTipoDocPer.push(new Ma_TipDocPer("C", "Tax Identification Number - TIN – Doc Trib PP.NN"));
    this.eTipoDocPer.push(new Ma_TipDocPer("D", "Identification Number - IN – Doc Trib PP. JJ"));
    return this.eTipoDocPer;
  }

  //[MA_PROVIDER]_____________________________________________________________________________________
  getProveedores() { return this.http.get(this.gApiURL + 'MA_PROVIDER/' + this.gIdEmpresa); }
  getProveedor(id: number) { return this.http.get(this.gApiURL + 'MA_PROVIDER/' + this.gIdEmpresa + '/' + id); }
  nuevoProveedor(ent: Ma_Provider) {
    ent.AUSUARIO = this.gUsuario;
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_PROVIDER";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  getBuscaProveedores(patronBus: string) { return this.http.get(this.gApiURL + 'MA_PROVIDER/' + this.gIdEmpresa + '/buscar/' + patronBus); }

  borrarProveedor(id: number) {
    let apiURL: string = this.gApiURL + "MA_PROVIDER/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //Tipo de Movimiento________________________________________________________________________
  getTipoMovimiento() {
    this.eTipoMovimiento = [];
    this.eTipoMovimiento.push(new Ma_TipoMovimiento("I", "Ingreso"));
    this.eTipoMovimiento.push(new Ma_TipoMovimiento("S", "Salida"));
    return this.eTipoMovimiento;
  }


  //Tipo de Transacciones________________________________________________________________________
  getTipoTransacciones() { return this.http.get(this.gApiURL + 'MA_TRANSACTION_TYPE/' + this.gIdEmpresa); }
  getTipoTransaccion(id: string) { return this.http.get(this.gApiURL + 'MA_TRANSACTION_TYPE/' + this.gIdEmpresa + '/' + id); }
  getTipoTransaccionxTipo(tipo: string) { return this.http.get(this.gApiURL + 'MA_TRANSACTION_TYPE/' + this.gIdEmpresa + '/buscar/' + tipo); }

  //Monedas______________________________________________________________________________________
  getMonedas() {
    this.eMonedas = [];
    this.eMonedas.push(new Ma_Moneda("PEN", "Nuevos soles"));
    this.eMonedas.push(new Ma_Moneda("DOL", "Dolares"));
    return this.eMonedas;
  }
  //Documentos___________________________________________________________________________________
  getDocumentos() { return this.http.get(this.gApiURL + 'MA_DOCTRANS_TYPE/' + this.gIdEmpresa); }
  getDocumento(id: string) { return this.http.get(this.gApiURL + 'MA_DOCTRANS_TYPE/' + this.gIdEmpresa + '/' + id); }


  //[MA_TRANSACTION_TYPE]_____________________________________________________________________________________
  getTipoTs() { return this.http.get(this.gApiURL + 'MA_TRANSACTION_TYPE/' + this.gIdEmpresa); }
  getTipoT(id: string) { return this.http.get(this.gApiURL + 'MA_TRANSACTION_TYPE/' + this.gIdEmpresa + '/' + id); }
  nuevoTipoT(ent: Ma_TipoTransaccion) {
    ent.TT_ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_TRANSACTION_TYPE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarTipoT(id: string) {
    let apiURL: string = this.gApiURL + "MA_TRANSACTION_TYPE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }



  //[MA_LOT]_____________________________________________________________________________________
  getLotes() { return this.http.get(this.gApiURL + 'MA_LOT/' + this.gIdEmpresa); }
  getLote(id: string) { return this.http.get(this.gApiURL + 'MA_LOT/' + this.gIdEmpresa + '/' + id); }
  getLotesxArticulo(idarti: number) { return this.http.get(this.gApiURL + 'MA_LOT/' + this.gIdEmpresa + '/xarti/' + idarti); }

  nuevoLote(ent: Ma_Lot) {
    ent.IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_LOT";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarLote(id: string) {
    let apiURL: string = this.gApiURL + "MA_LOT/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  


}

