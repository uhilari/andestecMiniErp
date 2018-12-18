import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Center_Cost } from '../../shared/modelos/Ma_Center_Cost';


@Component({
  selector: 'app-centrocostolist',
  templateUrl: './centrocostolist.component.html',
  styles: []
})
export class CentrocostolistComponent {
  eCentroCosto: Ma_Center_Cost[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarCentroCostos();
  }

  cargarCentroCostos() {
    this.bol_cargando = true;
    this.maestroServicio.getCentrocostos()
      .then((resp: Ma_Center_Cost[]) => {
        this.eCentroCosto = resp;
        this.bol_cargando = false;
      }).catch(err => this.ShowError(err));
  }

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  borrarCentrocosto(id: string) {
    if (confirm("¿Deseas eliminar este registro?")) {
      this.maestroServicio.borrarCentroCosto(id).then(
        res => {
          if (res == "ok") {
            this.maestroServicio.getCentrocostos()
              .then((resp: Ma_Center_Cost[]) => {
                this.eCentroCosto = resp;
              });
          }
        }
      ).catch(err => this.ShowError(err));
    }
  }

}
