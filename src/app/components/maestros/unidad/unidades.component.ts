import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Unit } from '../../shared/modelos/Ma_Unit';



@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styles: []
})
export class UnidadesComponent {
  eUnidades: Ma_Unit[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;


  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getUnidades()
      .then((resp: Ma_Unit[]) => { this.eUnidades = resp; this.bol_cargando = false; })
      .catch(errr => this.ShowError(errr));
  }

  borrarUnidad(codigo: string) {    
    if (confirm("¿Deseas eliminar este registro?")) {
      this.maestroServicio.borrarUnidadMed(codigo).then(
        res => {
          if (res == "ok") {
            this.cargarListado();
          }
        }
      ).catch(err => this.ShowError(err));
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
