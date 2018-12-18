import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';

@Component({
  selector: 'app-almacenlist',
  templateUrl: './almacenlist.component.html'
})
export class AlmacenlistComponent implements OnInit {
  eAlmacenes: Ma_Warehouse[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private almacenservicio: MaestrosService) {
    this.cargarListado();
  }

  ngOnInit() {
  }

  cargarListado() {
    this.eAlmacenes = [];
    this.bol_cargando = true;
    this.almacenservicio.getAlmacenes()
      .then((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
        this.bol_cargando = false;
      }).catch(err => { this.ShowError(err) });;
  }

  borrarAlmacen(idAlm: string) {
    if (confirm("Seguro de eliminar?")) {
      this.almacenservicio.borrarAlmacen(idAlm)
      .then(res => this.cargarListado())
      .catch(err => this.ShowError(err));;
    }
  }


  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }


}
