import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_PROJECT } from '../../shared/modelos/MA_PROJECT';

@Component({
  selector: 'app-proyectolist',
  templateUrl: './proyectolist.component.html',
  styleUrls: []
})
export class ProyectolistComponent {
  eProyecto: MA_PROJECT[];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }
  cargarListado() {
    this.maestroServicio.getProyectos().subscribe((resp: MA_PROJECT[]) => {
      this.eProyecto = resp;
    });
  }

  borrarProyecto(codigo: string) {
    this.maestroServicio.borrarProyecto(codigo);
    this.cargarListado();
  }

}
