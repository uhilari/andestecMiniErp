import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Service } from '../../shared/modelos/Ma_Service';

@Component({
  selector: 'app-serviciolist',
  templateUrl: './serviciolist.component.html',
  styles: []
})
export class ServiciolistComponent {
  eServicio: Ma_Service[];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.maestroServicio.getServicios().subscribe((resp: Ma_Service[]) => {
      this.eServicio = resp;      
    });
  }

  borrarServicio(codigo: string) {
    this.maestroServicio.borrarServicio(codigo);
    this.cargarListado();
  }
}
