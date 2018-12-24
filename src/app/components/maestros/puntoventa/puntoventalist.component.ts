import { Component } from '@angular/core';
import { MA_SALESPOINT } from '../../shared/modelos/MA_SALESPOINT';
import { MaestrosService } from '../../../services/maestros.service';
declare var swal: any;

@Component({
  selector: 'app-puntoventalist',
  templateUrl: './puntoventalist.component.html',
  styleUrls: []
})
export class PuntoventalistComponent {
  ePuntoVenta: MA_SALESPOINT[] = [];
  bol_msj: boolean = false;
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;


  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getPuntoVentas().then(
      (resp: MA_SALESPOINT[]) => {
        this.ePuntoVenta = resp;
        this.bol_cargando = false;
      }).catch(err => this.ShowError(err));
  }

  borrarPuntoVenta(codigo: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarPuntoVenta(codigo).then(
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
