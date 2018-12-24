import { Component } from '@angular/core';
import { Ma_TipoTransaccion } from '../../shared/modelos/Ma_TipoTransaccion';
import { MaestrosService } from '../../../services/maestros.service';
declare var swal: any;

@Component({
  selector: 'app-tipotransaccionlist',
  templateUrl: './tipotransaccionlist.component.html',
  styleUrls: []
})
export class TipotransaccionlistComponent {
  eTipoT: Ma_TipoTransaccion[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getTipoTs()
      .then((resp: Ma_TipoTransaccion[]) => {
        this.eTipoT = resp;
        this.bol_cargando = false;
      }).catch(err => this.ShowError(err));
  }

  borrartipot(codigo: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarUnidadMed(codigo).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarListado();
              }
            }
          ).catch(err => this.ShowError(err));
        }
      });
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
