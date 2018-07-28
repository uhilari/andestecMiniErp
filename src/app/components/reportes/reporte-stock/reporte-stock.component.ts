import { Component } from '@angular/core';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-reporte-stock',
  templateUrl: './reporte-stock.component.html',
  styleUrls: []
})
export class ReporteStockComponent  {

  eAlmacen: Ma_Warehouse[] = [];
  constructor(maestroservicio: MaestrosService) {
    this.eAlmacen = maestroservicio.getAlmacenes();
    console.log(this.eAlmacen);
    
  }

  

}
