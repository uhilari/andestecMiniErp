import { Component } from '@angular/core';
import { MaestrosService } from '../../services/maestros.service';
import { Maestros } from '../shared/modelos/maestros';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styles: []
})
export class MaestrosComponent {

  titulo: string = "Lista de Maestros Disponibles";
  maestrosModulos = [
    new Maestros("Clientes", "Registro de clientes", ""),
    new Maestros("Proveedores", "Registro de Proveedores", ""),
    new Maestros("Articulos", "Registro de productos", ""),
    new Maestros("Almacen", "Registro de almacenes", ""),
    new Maestros("Centro de Costo", "Registro de Centros de costos de la empresa", ""),
    new Maestros("Tablas", "Otras tablas mas com medidas, cantidades,servicios,centro de costos", ""),
  ];

  constructor() {

  }



}
