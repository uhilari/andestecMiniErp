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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ma_TipoMovimiento } from '../components/shared/modelos/Ma_TipoMovimiento';
import { Ma_Lot } from '../components/shared/modelos/Ma_Lot';
import { MA_PAYMENTTYPE } from '../components/shared/modelos/MA_PAYMENTTYPE';
import { MA_SALESTYPE } from '../components/shared/modelos/MA_SALESTYPE';
import { MA_PROJECT } from '../components/shared/modelos/MA_PROJECT';
import { EMA_SELLER } from '../components/shared/modelos/EMA_SELLER';
import { MA_DOCUMENTS } from '../components/shared/modelos/MA_DOCUMENTS';
import { MA_SALESPOINT } from '../components/shared/modelos/MA_SALESPOINT';
import { MA_SALPOINTSERIE } from '../components/shared/modelos/MA_SALPOINTSERIE';
import { MA_TYPECOMMERCE } from '../components/shared/modelos/MA_TYPECOMMERCE';
import { MA_TYPECUSTOMER } from '../components/shared/modelos/MA_TYPECUSTOMER';
import { MA_TYPEPRICE } from '../components/shared/modelos/MA_TYPEPRICE';
import { MA_TYPEPROVIDER } from '../components/shared/modelos/MA_TYPEPROVIDER';
import { ECA_BANKACCOUNT } from '../components/shared/modelos/ECA_BANKACCOUNT';
import { ECA_COLLECTOR } from '../components/shared/modelos/ECA_COLLECTOR';
import { ECA_TRANSCOLLECTION } from '../components/shared/modelos/ECA_TRANSCOLLECTION';
import { EMA_BANK } from '../components/shared/modelos/EMA_BANK';
import { AppGlobals } from '../components/shared/modelos/app.global';


@Injectable({ providedIn: 'root' })

export class MaestrosService {

  gIdEmpresa: number = 0;
  gApiURL: string = '';
  gUsuario: string = '';

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
  eDocumentos: MA_DOCUMENTS[] = [];
  eVendedores: EMA_SELLER[];

  entAlma: Ma_Warehouse;

  constructor(private http: HttpClient, private appglo: AppGlobals) {
    this.gApiURL = this.appglo.baseAPIUrl;
    this.gIdEmpresa = this.appglo.baseAppEmpresa;
    this.gUsuario = this.appglo.baseAppUsuario;
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
  getArticuloxNombre(dato: string) { 
    if (dato == '') {
      dato = '9z';
    }
    return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa + '/buscar/' + dato); }

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
  getClientesxNombre(dato: string) { 
    if (dato == '') {
      dato = '9z';
    }
    return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa + '/buscar/' + dato); }

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
  getBuscaProveedores(patronBus: string) { 
    if (patronBus == '') {
      patronBus = '9z';
    }
    return this.http.get(this.gApiURL + 'MA_PROVIDER/' + this.gIdEmpresa + '/buscar/' + patronBus); }

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

  //Version beta
  //Documentos___________________________________________________________________________________
  //getDocumentos() { return this.http.get(this.gApiURL + 'MA_DOCTRANS_TYPE/' + this.gIdEmpresa); }
  //getDocumento(id: string) { return this.http.get(this.gApiURL + 'MA_DOCTRANS_TYPE/' + this.gIdEmpresa + '/' + id); }


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

  //MA_PAYMENTTYPE
  getFormaPagos() { return this.http.get(this.gApiURL + 'MA_PAYMENTTYPE/' + this.gIdEmpresa); }
  getFormaPago(id: string) { return this.http.get(this.gApiURL + 'MA_PAYMENTTYPE/' + this.gIdEmpresa + '/' + id); }

  nuevoFormaPago(ent: MA_PAYMENTTYPE) {
    ent.PT_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_PAYMENTTYPE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarFormaPago(id: string) {
    let apiURL: string = this.gApiURL + "MA_PAYMENTTYPE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //MA_PROJECT
  getProyectos() { return this.http.get(this.gApiURL + 'MA_PROJECT/' + this.gIdEmpresa); }
  getProyecto(id: string) { return this.http.get(this.gApiURL + 'MA_PROJECT/' + this.gIdEmpresa + '/' + id); }

  nuevoProyecto(ent: MA_PROJECT) {
    ent.PJ_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_PROJECT";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarProyecto(id: string) {
    let apiURL: string = this.gApiURL + "MA_PROJECT/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }



  //MA_SALESTYPE
  getTipoVentas() { return this.http.get(this.gApiURL + 'MA_SALESTYPE/' + this.gIdEmpresa); }
  getTipoVenta(id: string) { return this.http.get(this.gApiURL + 'MA_SALESTYPE/' + this.gIdEmpresa + '/' + id); }

  nuevoTipoVenta(ent: MA_SALESTYPE) {
    ent.ST_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_SALESTYPE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarTipoVenta(id: string) {
    let apiURL: string = this.gApiURL + "MA_SALESTYPE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //MA_SELLER
  getVendedores() { return this.http.get(this.gApiURL + 'MA_SELLER/' + this.gIdEmpresa); }
  getVendedor(id: string) { return this.http.get(this.gApiURL + 'MA_SELLER/' + this.gIdEmpresa + '/' + id); }

  nuevoVendedor(ent: EMA_SELLER) {
    ent.SE_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_SELLER";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarVendedor(id: string) {
    let apiURL: string = this.gApiURL + "MA_SELLER/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //MA_DOCUMENTS
  getDocumentos() { return this.http.get(this.gApiURL + 'MA_DOCUMENTS/' + this.gIdEmpresa); }
  getDocumento(id: string) { return this.http.get(this.gApiURL + 'MA_DOCUMENTS/' + this.gIdEmpresa + '/' + id); }

  nuevoDocumento(ent: MA_DOCUMENTS) {
    ent.ID_COMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_DOCUMENTS";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarDocumento(id: string) {
    let apiURL: string = this.gApiURL + "MA_DOCUMENTS/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //MA_SALESPOINT
  getPuntoVentas() { return this.http.get(this.gApiURL + 'MA_SALESPOINT/' + this.gIdEmpresa); }
  getPuntoVenta(id: string) { return this.http.get(this.gApiURL + 'MA_SALESPOINT/' + this.gIdEmpresa + '/' + id); }

  nuevoPuntoVenta(ent: MA_SALESPOINT) {
    ent.SP_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_SALESPOINT";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarPuntoVenta(id: string) {
    let apiURL: string = this.gApiURL + "MA_SALESPOINT/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //MA_SALPOINTSERIE
  getPuntoSeries(pun: string) { return this.http.get(this.gApiURL + 'MA_SALPOINTSERIE/' + this.gIdEmpresa + '/' + pun); }
  getSerieCorrelativo(pun: string, doc: string) { return this.http.get(this.gApiURL + 'MA_SALPOINTSERIE/' + this.gIdEmpresa + '/' + pun + '/' + doc); }
  getDocxPtoVta(pun: string) { return this.http.get(this.gApiURL + 'MA_SALPOINTSERIE/' + this.gIdEmpresa + '/comprobante/' + pun); }


  nuevoPuntoSerie(ent: MA_SALPOINTSERIE) {
    ent.SS_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_SALPOINTSERIE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarPuntoSerie(id: string) {
    let apiURL: string = this.gApiURL + "MA_SALPOINTSERIE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //MA_TYPECOMMERCE
  getTipoComercios() { return this.http.get(this.gApiURL + 'MA_TYPECOMMERCE/' + this.gIdEmpresa); }
  getTipoComercio(id: string) { return this.http.get(this.gApiURL + 'MA_TYPECOMMERCE/' + this.gIdEmpresa + '/' + id); }

  nuevoTipoComercio(ent: MA_TYPECOMMERCE) {
    ent.TC_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_TYPECOMMERCE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarTipoComercio(id: string) {
    let apiURL: string = this.gApiURL + "MA_TYPECOMMERCE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //MA_TYPECUSTOMER
  getTipoClientes() { return this.http.get(this.gApiURL + 'MA_TYPECUSTOMER/' + this.gIdEmpresa); }
  getTipoCliente(id: string) { return this.http.get(this.gApiURL + 'MA_TYPECUSTOMER/' + this.gIdEmpresa + '/' + id); }

  nuevoTipoCliente(ent: MA_TYPECUSTOMER) {
    ent.TC_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_TYPECUSTOMER";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarTipoCliente(id: string) {
    let apiURL: string = this.gApiURL + "MA_TYPECUSTOMER/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //MA_TYPEPRICE
  getTipoPrecios() { return this.http.get(this.gApiURL + 'MA_TYPEPRICE/' + this.gIdEmpresa); }
  getTipoPrecio(id: string) { return this.http.get(this.gApiURL + 'MA_TYPEPRICE/' + this.gIdEmpresa + '/' + id); }

  nuevoTipoPrecio(ent: MA_TYPEPRICE) {
    ent.TP_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_TYPEPRICE";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarTipoPrecio(id: string) {
    let apiURL: string = this.gApiURL + "MA_TYPEPRICE/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //MA_TYPEPROVIDER
  getTipoProveedores() { return this.http.get(this.gApiURL + 'MA_TYPEPROVIDER/' + this.gIdEmpresa); }
  getTipoProveedor(id: string) { return this.http.get(this.gApiURL + 'MA_TYPEPROVIDER/' + this.gIdEmpresa + '/' + id); }

  nuevoTipoProveedor(ent: MA_TYPEPROVIDER) {
    ent.TP_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_TYPEPROVIDER";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarTipoProveedor(id: string) {
    let apiURL: string = this.gApiURL + "MA_TYPEPROVIDER/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }

  //CA_BANKACCOUNT
  getCuentaBancarias() { return this.http.get(this.gApiURL + 'CA_BANKACCOUNT/' + this.gIdEmpresa); }
  getCuentaBancaria(id: string) { return this.http.get(this.gApiURL + 'CA_BANKACCOUNT/' + this.gIdEmpresa + '/' + id); }
  getCuentaBancariaxBanco(idBanco: string) { return this.http.get(this.gApiURL + 'CA_BANKACCOUNT/' + this.gIdEmpresa + '/xbanco/' + idBanco); }

  nuevaCuentaBancaria(ent: ECA_BANKACCOUNT) {
    ent.AB_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "CA_BANKACCOUNT";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarCuentaBancaria(id: string) {
    let apiURL: string = this.gApiURL + "CA_BANKACCOUNT/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }



  //CA_COLLECTOR
  getCobradores() { return this.http.get(this.gApiURL + 'CA_COLLECTOR/' + this.gIdEmpresa); }
  getCobrador(id: string) { return this.http.get(this.gApiURL + 'CA_COLLECTOR/' + this.gIdEmpresa + '/' + id); }

  nuevoCobrador(ent: ECA_COLLECTOR) {
    ent.CO_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "CA_COLLECTOR";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarCobrador(id: string) {
    let apiURL: string = this.gApiURL + "CA_COLLECTOR/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //CA_TRANSCOLLECTION
  getTipoTransaccionesCaja() { return this.http.get(this.gApiURL + 'CA_TRANSCOLLECTION/' + this.gIdEmpresa); }
  getTipoTransaccionCaja(id: string) { return this.http.get(this.gApiURL + 'CA_TRANSCOLLECTION/' + this.gIdEmpresa + '/' + id); }

  nuevoTipoTransaccionCaja(ent: ECA_TRANSCOLLECTION) {
    ent.TC_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "CA_TRANSCOLLECTION";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarTipoTransaccionCaja(id: string) {
    let apiURL: string = this.gApiURL + "CA_TRANSCOLLECTION/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //MA_BANK
  getBancos() { return this.http.get(this.gApiURL + 'MA_BANK/' + this.gIdEmpresa); }
  getBanco(id: string) { return this.http.get(this.gApiURL + 'MA_BANK/' + this.gIdEmpresa + '/' + id); }

  nuevoBanco(ent: EMA_BANK) {
    ent.BA_IDCOMPANY = this.gIdEmpresa;
    let apiURL: string = this.gApiURL + "MA_BANK";
    let body = JSON.stringify(ent);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiURL, body, { headers })
      .subscribe((r) => {
        console.log('respuesta de post', r);
      }, error => console.log('oops', error));
  }
  borrarBanco(id: string) {
    let apiURL: string = this.gApiURL + "MA_BANK/" + this.gIdEmpresa + '/' + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(apiURL, { headers })
      .subscribe((r) => {
        console.log('respuesta de delete', r);
      }, error => console.log('oops', error));
  }


  //MA_CREDITCARD
  getTarjetasCredito() { return this.http.get(this.gApiURL + 'MA_CREDITCARD/' + this.gIdEmpresa); }


  //MA_PAYMENTMETHOD
  getFormasPago() { return this.http.get(this.gApiURL + 'MA_PAYMENTMETHOD/' + this.gIdEmpresa); }
  
}



