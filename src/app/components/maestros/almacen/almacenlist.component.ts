import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';

@Component({
  selector: 'app-almacenlist',
  templateUrl: './almacenlist.component.html'
})
export class AlmacenlistComponent implements OnInit {
  eAlmacenes: Ma_Warehouse[];

  constructor(private almacenservicio: MaestrosService) {
    this.cargarListado();
    console.log('empezando contructor');
  }

  ngOnInit() {
    console.log('empezando OnInit');
  }

  cargarListado() {
    this.almacenservicio.getAlmacenes()
      .subscribe((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
        console.log(resp);
      });
  }

  borrarAlmacen(idAlm: string) {
    this.almacenservicio.borrarAlmacen(idAlm);
    this.cargarListado();    
  }

}
