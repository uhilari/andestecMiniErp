import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Commodity_Type } from '../../shared/modelos/Ma_Commodity_Type';


@Component({
  selector: 'app-mercanciatipolist',
  templateUrl: './mercanciatipolist.component.html',
  styles: []
})
export class MercanciatipolistComponent {

  eCommodity: Ma_Commodity_Type[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarTipos();
  }

  cargarTipos() {
    this.bol_cargando = true;
    this.maestroServicio.getCommoditys()
      .then((resp: Ma_Commodity_Type[]) => {
        this.eCommodity = resp;
        this.bol_cargando = false;
      }).catch(err => this.ShowError(err));
  }

  borrarMercanciatipo(codigo: string) {
    if (confirm("seguro de eliminar?")) {
      this.maestroServicio.borrarCommodity(codigo).then(
        res => {
          if (res == "ok") {
            this.cargarTipos();
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
