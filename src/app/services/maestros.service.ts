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

@Injectable({ providedIn: 'root' })

export class MaestrosService {

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

  constructor() {
    console.log("servicio maestros listo para usarse!!");
  }
  //Almacenes =================================================================
  //devulve la lista de almacenes
  getAlmacenes() {
    this.eAlmacen.push(new Ma_Warehouse(0, "principal", "san isidro", 1));
    this.eAlmacen.push(new Ma_Warehouse(1, "repuestos", "ventanilla", 1));
    this.eAlmacen.push(new Ma_Warehouse(2, "maquinas", "huachipa", 1));
    return this.eAlmacen;
  }
  //devuelve un almacen especifico
  getAlmacen(codigo: string): Ma_Warehouse {
    return new Ma_Warehouse(20, "casa", "callao", 1);
  }
  nuevoAlmacen(ent: Ma_Warehouse) {
    this.eAlmacen.push(new Ma_Warehouse(30, "nuevo almacen", "temporal", 1));
  }

  //centro de costo ============================================================
  getCentrocostos() {
    this.eCentrocosto.push(new Ma_Center_Cost(1, 1, 'Contabilidad'));
    this.eCentrocosto.push(new Ma_Center_Cost(1, 2, 'Admnistracion'));
    this.eCentrocosto.push(new Ma_Center_Cost(1, 3, 'Servicios Generales'));
    return this.eCentrocosto;
  }
  getCentrocosto(codigo: string): Ma_Center_Cost {
    let x: number = parseInt(codigo);
    return new Ma_Center_Cost(1, x, "CC-a editar");
  }

  nuevoCentrocosto(ent: Ma_Center_Cost) {
    this.eCentrocosto.push(new Ma_Center_Cost(ent.ID_COMPANY, ent.ID_CENTER_COST, ent.DESCRIPTION_CENTER_COST));
  }
  //Familias ___________________________________________________________________
  getFamilias() {
    this.eFamilia.push(new Ma_Family(1, 1, "Familia 01"));
    this.eFamilia.push(new Ma_Family(1, 2, "Familia 02"));
    this.eFamilia.push(new Ma_Family(1, 3, "Familia 03"));
    return this.eFamilia;
  }
  getFamilia(codigo: string): Ma_Family {
    let x: number = parseInt(codigo);
    return new Ma_Family(1, x, "Familia a editar");
  }

  nuevaFamilia(ent: Ma_Family) {
    this.eFamilia.push(new Ma_Family(1, ent.ID_FAMILY, ent.DESCRIPTION_FAMILY));
  }

  //[Familias Sub]  _______________________________________________________________
  getFamiliasSub() {
    this.eFamiliaSub.push(new Ma_Family_Sub(1, 1, 1, "sub familia 1"));
    this.eFamiliaSub.push(new Ma_Family_Sub(1, 1, 2, "sub familia 2"));
    this.eFamiliaSub.push(new Ma_Family_Sub(1, 1, 3, "sub familia 3"));
    return this.eFamiliaSub;
  }
  getFamiliaSub(codigo: string): Ma_Family_Sub {
    let x: number = parseInt(codigo);
    return new Ma_Family_Sub(1, 1, 1, "Sub familia a editar");
  }
  nuevaFamiliaSub(ent: Ma_Family_Sub) {
    this.eFamiliaSub.push(new Ma_Family_Sub(1, ent.ID_FAMILY, ent.ID_FAMILY_SUB, ent.DESCRIPTION_FAMILY_SUB));
  }

  //[MA_COMMODITY_TYPE] _______________________________________________________________
  getCommoditys() {
    this.eCommodity.push(new Ma_Commodity_Type(1, 1, "Bodega"));
    this.eCommodity.push(new Ma_Commodity_Type(1, 2, "Restaurante"));
    this.eCommodity.push(new Ma_Commodity_Type(1, 3, "Cafeteria"));
    return this.eCommodity;
  }
  getCommodity(codigo: string): Ma_Commodity_Type {
    let x: number = parseInt(codigo);
    return new Ma_Commodity_Type(1, x, "Polleria");
  }

  nuevoCommodity(ent: Ma_Commodity_Type) {
    this.eCommodity.push(new Ma_Commodity_Type(ent.ID_COMPANY, ent.ID_COMMODITY_TYPE, ent.DESCRIPTION_COMMODITY));
  }

  //[MA_SERVICES]__________________________________________________________________________________
  getServicios() {
    this.eServicio.push(new Ma_Service(1, 1, "Servicio 01"));
    this.eServicio.push(new Ma_Service(1, 2, "Servicio 02"));
    this.eServicio.push(new Ma_Service(1, 3, "Servicio 03"));
    return this.eServicio;
  }
  getServicio(codigo: string): Ma_Service {
    let x: number = parseInt(codigo);
    return new Ma_Service(1, 1, "servicio a editar");
  }
  nuevoServicio(ent: Ma_Service) {
    this.eServicio.push(new Ma_Service(ent.ID_COMPANY, ent.ID_SERVICES, ent.DESCRIPTION_SERVICES));
  }

  //[MA_UNITS]_____________________________________________________________________________________
  getUnidades() {
    this.eUnidad.push(new Ma_Unit(1, 1, "Unidad"));
    this.eUnidad.push(new Ma_Unit(1, 2, "Kilogramo"));
    this.eUnidad.push(new Ma_Unit(1, 3, "Tonelada"));
    this.eUnidad.push(new Ma_Unit(1, 4, "Metro"));
    return this.eUnidad;
  }
  getUnidad(codigo: string): Ma_Unit {
    let x: number = parseInt(codigo);
    return new Ma_Unit(1, x, "unidad  a editar");
  }
  nuevaUnidad(ent: Ma_Unit) {
    this.eUnidad.push(new Ma_Unit(ent.ID_COMPANY, ent.ID_UNIT, ent.DESCRIPTION_UNIT));
  }

  //[MA_ARTICLE]______________________________________________________________________________________
  getArticulos() {
    this.eArticulo.push(new Ma_Article(1, 1, 1, 1, 1, 1, 1, "Articulo1", "Articulo1 comercial", "Nom tecnico ", "", "", "", "Modelo1", "", "", "", "", "", ""));
    this.eArticulo.push(new Ma_Article(2, 1, 1, 1, 1, 1, 1, "Articulo2", "Articulo1 comercial", "Nom tecnico ", "", "", "", "Modelo1", "", "", "", "", "", ""));
    this.eArticulo.push(new Ma_Article(3, 1, 1, 1, 1, 1, 1, "Articulo3", "Articulo1 comercial", "Nom tecnico ", "", "", "", "Modelo1", "", "", "", "", "", ""));
    this.eArticulo.push(new Ma_Article(4, 1, 1, 1, 1, 1, 1, "Articulo4", "Articulo1 comercial", "Nom tecnico ", "", "", "", "Modelo1", "", "", "", "", "", ""));
    return this.eArticulo;
  }
  getArticulo(codigo: string): Ma_Article {
    let x: number = parseInt(codigo);
    return new Ma_Article(1, x, 1, 1, 1, 1, 1, "Articulo a editar ....", "Articulo1", "Nom comercial ", "", "", "", "Modelo1", "", "", "", "", "", "");
  }
  nuevoArticulo(ent: Ma_Article) {
    this.eArticulo.push(new Ma_Article(1, ent.ID_ARTICLE, 1, 1, 1, 1, 1, ent.DESCRIPTION_ARTICLE, "Articulo1 comercial", "tecnico ", "", "", "", "Modelo1", "", "", "", "", "", ""));
  }

  //[MA_CUSTOMER]________________________________________________________________________________________
  getClientes() {
    this.eCliente.push(new Ma_Customer(1, 1, "CLiente 1", "dni", "41619045", "", "", "", "", 0, 0, 0, 0, "señor contacto", "921456544", "", 0, 0, "", "", "", ""));
    this.eCliente.push(new Ma_Customer(2, 1, "CLiente 2", "ruc", "20416190455", "", "", "", "", 0, 0, 0, 0, "señor contacto", "923445487", "", 0, 0, "", "", "", ""));
    this.eCliente.push(new Ma_Customer(3, 1, "CLiente 3", "ruc", "20441904532", "", "", "", "", 0, 0, 0, 0, "señor contacto", "999666435", "", 0, 0, "", "", "", ""));
    this.eCliente.push(new Ma_Customer(4, 1, "CLiente 4", "ruc", "20554321223", "", "", "", "", 0, 0, 0, 0, "señor contacto", "90923481", "", 0, 0, "", "", "", ""));
    return this.eCliente;
  }
  getCliente(codigo: string): Ma_Customer {
    let x: number = parseInt(codigo);
    return new Ma_Customer(x, 1, "CLiente 4", "ruc", "20554321223", "", "", "", "", 0, 0, 0, 0, "señor contacto", "", "", 0, 0, "", "", "", "");
  }
  nuevoCliente(ent: Ma_Customer) {
    this.eCliente.push(new Ma_Customer(ent.ID_CUSTOMER, 1, ent.DESCRIPTION_CUSTOMER, "ruc", ent.NUMBER_DOCUMENT, "", "", "", "", 0, 0, 0, 0, ent.CONTACT, ent.MOVIL_CONTACT, "", 0, 0, "", "", "", ""));
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
  getProveedores() {
    this.eProveedor = [];
    this.eProveedor.push(new Ma_Provider(1, 1, "Proveedor 1", "6", "1112121221", "", "", "", "", "@", 1, "", "", "", ""));
    this.eProveedor.push(new Ma_Provider(2, 1, "Proveedor 2", "6", "4567886444", "", "", "", "", "@", 1, "", "", "", ""));
    this.eProveedor.push(new Ma_Provider(3, 1, "Proveedor 3", "6", "2045532222", "", "", "", "", "@", 1, "", "", "", ""));
    this.eProveedor.push(new Ma_Provider(4, 1, "Proveedor 4", "6", "20556343565", "", "", "", "", "@", 1, "", "", "", ""));
    return this.eProveedor;
  }
  getProveedor(codigo: string): Ma_Provider {
    let x: number = parseInt(codigo);
    return new Ma_Provider(x, 1, "Proveedor a Editar", "6", "99999", "", "", "", "", "correo@xxxxx.xxx", 1, "", "", "", "");
  }
  nuevoProveedor(ent: Ma_Provider) {
    this.eProveedor.push(new Ma_Provider(ent.ID_PROVIDER, 1, ent.DESCRIPTION_PROVIDER, ent.DOCUMENT_TYPE_PROVIDER, ent.NUMBER_DOCUMENT, "", "", "", "", ent.EMAIL, 1, "", "", "", ""));
  }




}

