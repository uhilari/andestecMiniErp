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
import { EMA_USERSALESPOINT } from '../components/shared/modelos/EMA_USERSALESPOINT';


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
  getAlmacenes(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_WAREHOUSE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getAlmacen(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_WAREHOUSE/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  registrarAlmacen(ent: Ma_Warehouse): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_WAREHOUSE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarAlmacen(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_WAREHOUSE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //centro de costo ============================================================
  getCentrocostos(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_CENTER_COST/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getCentrocosto(id: string) { return this.http.get(this.gApiURL + 'MA_CENTER_COST/' + this.gIdEmpresa + '/' + id); }

  nuevoCentrocosto(ent: Ma_Center_Cost): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_CENTER_COST";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarCentroCosto(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_CENTER_COST/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //Familias ___________________________________________________________________
  getFamilias(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_FAMILY/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getFamilia(id: string) { return this.http.get(this.gApiURL + 'MA_FAMILY/' + this.gIdEmpresa + '/' + id); }
  nuevaFamilia(ent: Ma_Family): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_FAMILY";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  borrarFamilia(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_FAMILY/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }



  //[Familias Sub]  _______________________________________________________________
  getFamiliasSub(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_FAMILY_SUB/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getFamiliaSub(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_FAMILY_SUB/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getFamiliaSubxFam(idFam: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_FAMILY_SUB/' + this.gIdEmpresa + '/fam/' + idFam)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevaFamiliaSub(ent: Ma_Family_Sub): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_FAMILY_SUB";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarSubFamilia(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_FAMILY_SUB/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //[MA_COMMODITY_TYPE] _______________________________________________________________
  getCommoditys(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_COMMODITY_TYPE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getCommodity(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_COMMODITY_TYPE/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoCommodity(ent: Ma_Commodity_Type): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_COMMODITY_TYPE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  borrarCommodity(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_COMMODITY_TYPE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }


  //[MA_SERVICES]__________________________________________________________________________________
  getServicios(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SERVICES/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

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

  borrarServicio(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_SERVICES/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //[MA_UNITS]_____________________________________________________________________________________
  getUnidades(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_UNITS/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getUnidad(id: string) { return this.http.get(this.gApiURL + 'MA_UNITS/' + this.gIdEmpresa + '/' + id); }
  nuevaUnidad(ent: Ma_Unit): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_UNITS";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  borrarUnidadMed(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_UNITS/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //[MA_ARTICLE]______________________________________________________________________________________
  getArticulos(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getArticulo(id: number) { return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa + '/' + id); }
  getArticuloxNombre(dato: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      if (dato == '') { dato = '9z'; }
      return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa + '/buscar/' + dato)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getArticuloxNombreLotes(dato: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      if (dato == '') { dato = '9z'; }
      return this.http.get(this.gApiURL + 'MA_ARTICLE/' + this.gIdEmpresa + '/buscarLotes/' + dato)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  registrarArticulo(ent: Ma_Article): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.AUSUARIO = this.gUsuario;
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_ARTICLE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarArticulo(id: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_ARTICLE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }


  //[MA_CUSTOMER]________________________________________________________________________________________
  getClientes(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getCliente(id: number) { return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa + '/' + id); }
  getClientesxNombre(dato: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      if (dato == '') { dato = '9z' }
      return this.http.get(this.gApiURL + 'MA_CUSTOMER/' + this.gIdEmpresa + '/buscar/' + dato)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoCliente(ent: Ma_Customer): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.AUSUARIO = this.gUsuario;
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_CUSTOMER";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarCliente(id: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_CUSTOMER/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
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
  getProveedores(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_PROVIDER/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getProveedor(id: number) { return this.http.get(this.gApiURL + 'MA_PROVIDER/' + this.gIdEmpresa + '/' + id); }

  nuevoProveedor(ent: Ma_Provider): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.AUSUARIO = this.gUsuario;
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_PROVIDER";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getBuscaProveedores(patronBus: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      if (patronBus == '') { patronBus = '9z'; }
      return this.http.get(this.gApiURL + 'MA_PROVIDER/' + this.gIdEmpresa + '/buscar/' + patronBus)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarProveedor(id: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_PROVIDER/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers }).subscribe(r => resolver(r), error => rechazar(error));
    });
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
  getTipoTs(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TRANSACTION_TYPE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  getTipoT(id: string) { return this.http.get(this.gApiURL + 'MA_TRANSACTION_TYPE/' + this.gIdEmpresa + '/' + id); }
  nuevoTipoT(ent: Ma_TipoTransaccion): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.TT_ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_TRANSACTION_TYPE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }
  borrarTipoT(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_TRANSACTION_TYPE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }



  //[MA_LOT]_____________________________________________________________________________________
  getLotes(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_LOT/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  getLote(id: string) { return this.http.get(this.gApiURL + 'MA_LOT/' + this.gIdEmpresa + '/' + id); }
  getLotesxArticulo(idarti: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_LOT/' + this.gIdEmpresa + '/xarti/' + idarti)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoLote(ent: Ma_Lot): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_LOT";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error)
        );
    });
  }

  borrarLote(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_LOT/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //MA_PAYMENTTYPE
  getFormaPagos(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_PAYMENTTYPE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getFormaPago(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_PAYMENTTYPE/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoFormaPago(ent: MA_PAYMENTTYPE): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.PT_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_PAYMENTTYPE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  borrarFormaPago(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_PAYMENTTYPE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }


  //MA_PROJECT
  getProyectos(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_PROJECT/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  getProyecto(id: string) { return this.http.get(this.gApiURL + 'MA_PROJECT/' + this.gIdEmpresa + '/' + id); }

  nuevoProyecto(ent: MA_PROJECT): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.PJ_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_PROJECT";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }
  borrarProyecto(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_PROJECT/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }



  //MA_SALESTYPE
  getTipoVentas(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SALESTYPE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }
  getTipoVenta(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SALESTYPE/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  nuevoTipoVenta(ent: MA_SALESTYPE): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ST_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_SALESTYPE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }
  borrarTipoVenta(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_SALESTYPE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }


  //MA_SELLER
  getVendedores(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SELLER/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }
  getVendedor(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SELLER/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  nuevoVendedor(ent: EMA_SELLER): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.SE_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_SELLER";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }
  borrarVendedor(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_SELLER/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }


  //MA_DOCUMENTS
  getDocumentos(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_DOCUMENTS/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }
  getDocumento(id: string) { return this.http.get(this.gApiURL + 'MA_DOCUMENTS/' + this.gIdEmpresa + '/' + id); }

  nuevoDocumento(ent: MA_DOCUMENTS): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.ID_COMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_DOCUMENTS";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  borrarDocumento(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_DOCUMENTS/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  //MA_SALESPOINT
  getPuntoVentas(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SALESPOINT/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  getPuntoVenta(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SALESPOINT/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  nuevoPuntoVenta(ent: MA_SALESPOINT): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.SP_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_SALESPOINT";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  borrarPuntoVenta(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_SALESPOINT/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  //MA_SALPOINTSERIE
  getPuntoSeries(pun: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_SALPOINTSERIE/' + this.gIdEmpresa + '/' + pun)
        .subscribe(r => resolver(r), error => rechazar(error))
    });
  }

  getSerieCorrelativo(pun: string, doc: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      this.http.get(this.gApiURL + 'MA_SALPOINTSERIE/' + this.gIdEmpresa + '/' + pun + '/' + doc)
        .subscribe((rpta) => {
          resolver(rpta);
        }, error => {
          rechazar(error);
        });
    });
  }

  getSerieCorrelativoRes(pun: string, doc: string, serieSel: string): Promise<any> {
    let numserie: string;
    return new Promise((resolver, rechazar) => {
      this.http.get(this.gApiURL + 'MA_SALPOINTSERIE/' + this.gIdEmpresa + '/' + pun + '/' + doc)
        .subscribe((rpta: MA_SALPOINTSERIE[]) => {
          rpta.forEach(element => {
            if (element.SS_SERIE == serieSel) {
              numserie = (element.SS_INITCORRE + 1).toString().padStart(8, '0');
            }
          });
          resolver(numserie);
        }, error => {
          rechazar(error);
        });
    });
  }
  getDocxPtoVta(pun: string) { return this.http.get(this.gApiURL + 'MA_SALPOINTSERIE/' + this.gIdEmpresa + '/comprobante/' + pun); }


  nuevoPuntoSerie(ent: MA_SALPOINTSERIE): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.SS_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_SALPOINTSERIE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error))
    });
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
  getTipoComercios(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TYPECOMMERCE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getTipoComercio(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TYPECOMMERCE/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoTipoComercio(ent: MA_TYPECOMMERCE): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.TC_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_TYPECOMMERCE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarTipoComercio(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_TYPECOMMERCE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //MA_TYPECUSTOMER
  getTipoClientes(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TYPECUSTOMER/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getTipoCliente(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TYPECUSTOMER/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoTipoCliente(ent: MA_TYPECUSTOMER): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.TC_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_TYPECUSTOMER";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarTipoCliente(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_TYPECUSTOMER/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }


  //MA_TYPEPRICE
  getTipoPrecios(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TYPEPRICE/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getTipoPrecio(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TYPEPRICE/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoTipoPrecio(ent: MA_TYPEPRICE): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.TP_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_TYPEPRICE";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarTipoPrecio(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_TYPEPRICE/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //MA_TYPEPROVIDER
  getTipoProveedores(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_TYPEPROVIDER/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  getTipoProveedor(id: string) { return this.http.get(this.gApiURL + 'MA_TYPEPROVIDER/' + this.gIdEmpresa + '/' + id); }

  nuevoTipoProveedor(ent: MA_TYPEPROVIDER): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.TP_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_TYPEPROVIDER";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  borrarTipoProveedor(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_TYPEPROVIDER/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //CA_BANKACCOUNT
  getCuentaBancarias(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'CA_BANKACCOUNT/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getCuentaBancaria(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'CA_BANKACCOUNT/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getCuentaBancariaxBanco(idBanco: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'CA_BANKACCOUNT/' + this.gIdEmpresa + '/xbanco/' + idBanco)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevaCuentaBancaria(ent: ECA_BANKACCOUNT): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.AB_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "CA_BANKACCOUNT";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarCuentaBancaria(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "CA_BANKACCOUNT/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }



  //CA_COLLECTOR
  getCobradores(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'CA_COLLECTOR/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getCobrador(id: string) { return this.http.get(this.gApiURL + 'CA_COLLECTOR/' + this.gIdEmpresa + '/' + id); }

  nuevoCobrador(ent: ECA_COLLECTOR): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.CO_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "CA_COLLECTOR";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error)
        );
    });
  }
  borrarCobrador(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "CA_COLLECTOR/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error)
        );
    });
  }


  //CA_TRANSCOLLECTION
  getTipoTransaccionesCaja(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'CA_TRANSCOLLECTION/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getTipoTransaccionCaja(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'CA_TRANSCOLLECTION/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoTipoTransaccionCaja(ent: ECA_TRANSCOLLECTION): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.TC_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "CA_TRANSCOLLECTION";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarTipoTransaccionCaja(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "CA_TRANSCOLLECTION/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }
  //MA_USERSALESPOINT
  //puntos de venta por usuario
  getPtoVtaxUsuario(empresa?: number): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_USERSALESPOINT/' + empresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoPtoVtaxUsuario(ent: EMA_USERSALESPOINT): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.US_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_USERSALESPOINT";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarPtoVtaxUsuario(idu: string, idp: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_USERSALESPOINT/" + this.gIdEmpresa + '/' + idu + '/' + idp;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }


  //MA_BANK
  getBancos(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_BANK/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  getBanco(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_BANK/' + this.gIdEmpresa + '/' + id)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  nuevoBanco(ent: EMA_BANK): Promise<any> {
    return new Promise((resolver, rechazar) => {
      ent.BA_IDCOMPANY = this.gIdEmpresa;
      let apiURL: string = this.gApiURL + "MA_BANK";
      let body = JSON.stringify(ent);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(apiURL, body, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  borrarBanco(id: string): Promise<any> {
    return new Promise((resolver, rechazar) => {
      let apiURL: string = this.gApiURL + "MA_BANK/" + this.gIdEmpresa + '/' + id;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete(apiURL, { headers })
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }


  //MA_CREDITCARD
  getTarjetasCredito(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_CREDITCARD/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

  //MA_PAYMENTMETHOD
  getFormasPago(): Promise<any> {
    return new Promise((resolver, rechazar) => {
      return this.http.get(this.gApiURL + 'MA_PAYMENTMETHOD/' + this.gIdEmpresa)
        .subscribe(r => resolver(r), error => rechazar(error));
    });
  }

}



