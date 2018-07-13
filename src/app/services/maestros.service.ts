import { Injectable } from '@angular/core';
import { Ma_Warehouse } from '../components/shared/modelos/Ma_Warehouse';
import { Ma_Center_Cost } from '../components/shared/modelos/Ma_Center_Cost';
import { Ma_Family } from '../components/shared/modelos/MA_FAMILY';
import { Ma_Family_Sub } from '../components/shared/modelos/Ma_Family_Sub';
import { Ma_Commodity_Type } from '../components/shared/modelos/Ma_Commodity_Type';
import { Ma_Service } from '../components/shared/modelos/Ma_Service';
import { Ma_Unit } from '../components/shared/modelos/Ma_Unit';

@Injectable({ providedIn: 'root' })

export class MaestrosService {

  eAlmacen: Ma_Warehouse[] = [];
  eCentrocosto: Ma_Center_Cost[] = [];
  eFamilia: Ma_Family[] = [];
  eFamiliaSub: Ma_Family_Sub[] = [];
  eCommodity: Ma_Commodity_Type[] = [];
  eServicio: Ma_Service[] = [];
  eUnidad: Ma_Unit[] = [];

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
}

