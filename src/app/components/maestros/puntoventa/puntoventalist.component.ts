import { Component } from '@angular/core';
import { MA_SALESPOINT } from '../../shared/modelos/MA_SALESPOINT';
import { MaestrosService } from '../../../services/maestros.service';

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
    this.maestroServicio.borrarPuntoVenta(codigo).then(
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
