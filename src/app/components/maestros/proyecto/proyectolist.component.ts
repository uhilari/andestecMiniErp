import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_PROJECT } from '../../shared/modelos/MA_PROJECT';

@Component({
  selector: 'app-proyectolist',
  templateUrl: './proyectolist.component.html',
  styleUrls: []
})
export class ProyectolistComponent {
  eProyecto: MA_PROJECT[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getProyectos()
      .then((resp: MA_PROJECT[]) => { this.eProyecto = resp; this.bol_cargando = false; })
      .catch(err => this.ShowError(err));
  }

  borrarProyecto(codigo: string) {
    this.maestroServicio.borrarProyecto(codigo).then(
      res => {
        if (res == "ok") {
          this.cargarListado();
        }
      }
    ).catch(err => this.ShowError(err));
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
