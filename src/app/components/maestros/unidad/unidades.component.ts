import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Unit } from '../../shared/modelos/Ma_Unit';



@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styles: []
})
export class UnidadesComponent {
  eUnidades: Ma_Unit[];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.maestroServicio.getUnidades()
      .subscribe((resp: Ma_Unit[]) => {
        this.eUnidades = resp;        
      });
  }

  borrarUnidad(codigo: string) {
    let eliminar = confirm("¿Deseas eliminar este registro?");
    if (eliminar) {
      this.maestroServicio.borrarUnidadMed(codigo);
      this.cargarListado();
    }

  }

}
