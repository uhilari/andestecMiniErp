import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Center_Cost } from '../../shared/modelos/Ma_Center_Cost';
declare var swal: any;

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
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarCentroCosto(id).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.maestroServicio.getCentrocostos()
                  .then((resp: Ma_Center_Cost[]) => {                    
                    this.eCentroCosto = resp;
                  });
              }
            }
          ).catch(err => this.ShowError(err));
        }
      });

  }

}
