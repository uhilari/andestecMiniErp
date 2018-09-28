import { Component } from '@angular/core';
import { Maestros } from '../shared/modelos/maestros';
import { Router } from "@angular/router";

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styles: []
})
export class MaestrosComponent {

  titulo: string = "Lista de Maestros Disponibles";

  maestrosModulosCaja = [    
    new Maestros(2, "Documento Caja", "Registro de Docs caja", ""),
    new Maestros(3, "Planillas", "Registro de planillas", ""),    
  ];

  maestrosModulosAlm = [    
    new Maestros(2, "Proveedores", "Registro de Proveedores", ""),
    new Maestros(3, "Articulos", "Registro de productos", ""),
    new Maestros(4, "Almacen", "Registro de almacenes", "almacenlist"),
    new Maestros(5, "Centro de Costo", "Registro de Centros de costos de la empresa", ""),
    new Maestros(6, "Familia", "Dato para agrupar los articulos en familia", ""),
    new Maestros(7, "Sub Familia", "Dato para clasificar las familias", ""),
    new Maestros(8, "Tipo de Mercaderia", "Agrupacion del tipo de giro del negocio", ""),
    new Maestros(9, "Unidad de Medida", "Listado de las unidades de medidas", ""),    
    new Maestros(11, "Tipo Transaccion", "lista de Tipo de Transacciones", ""),
    new Maestros(12, "Lotes", "Registrar los lotes de cada producto", ""),    
    new Maestros(14, "Proyectos", "Registrar los pryectos", ""),    
    new Maestros(17, "Documentos", "Registrar los documentos como facturas boletas etc", ""),    
  ];

  maestrosModulosVta = [
    new Maestros(1, "Clientes", "Registro de clientes", ""),        
    new Maestros(10, "Servicio", "lista de servicios", ""),
    new Maestros(11, "Tipo Transaccion", "lista de Tipo de Transacciones", ""),    
    new Maestros(13, "Forma de Pago", "Registrar las formas de pago", ""),    
    new Maestros(15, "Tipo de Venta", "Registrar los tipo de ventas", ""),
    new Maestros(16, "Vendedores", "Registrar los vendedores", ""),    
    new Maestros(18, "Puntos de Venta", "Registrar los puntos de ventas", ""),
  ];


  constructor(private router: Router) {

  }

  toNavegar(maestro: number) {
    if (maestro == 1) { this.router.navigate(['clientes']); }
    if (maestro == 2) { this.router.navigate(['proveedores']); }
    if (maestro == 3) { this.router.navigate(['articulos']); }
    if (maestro == 4) { this.router.navigate(['almacenes']); }
    if (maestro == 5) { this.router.navigate(['centrocostos']); }
    if (maestro == 6) { this.router.navigate(['familias']); }
    if (maestro == 7) { this.router.navigate(['familiassub']); }
    if (maestro == 8) { this.router.navigate(['mercanciatipos']); }
    if (maestro == 9) { this.router.navigate(['unidades']); }
    if (maestro == 10) { this.router.navigate(['servicios']); }
    if (maestro == 11) { this.router.navigate(['tipotransacciones']); }
    if (maestro == 12) { this.router.navigate(['lotes']); }
    if (maestro == 13) { this.router.navigate(['formapagos']); }
    if (maestro == 14) { this.router.navigate(['proyectos']); }
    if (maestro == 15) { this.router.navigate(['tipoventas']); }
    if (maestro == 16) { this.router.navigate(['vendedores']); }
    if (maestro == 17) { this.router.navigate(['documentos']); }
    if (maestro == 18) { this.router.navigate(['puntoventas']); }
  }

}
