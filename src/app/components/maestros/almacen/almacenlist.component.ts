import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';

@Component({
  selector: 'app-almacenlist',
  templateUrl: './almacenlist.component.html'
})
export class AlmacenlistComponent implements OnInit {
  eAlmacenes: Ma_Warehouse[];
  constructor(almacenservicio: MaestrosService) {
    this.eAlmacenes = almacenservicio.getAlmacenes();
  }

  ngOnInit() {
  }

  borrarAlmacen(idAlm: string) {
    console.log("Eliminando el almacen: ", idAlm);

  }

}
