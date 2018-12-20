import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_PAYMENTTYPE } from '../../shared/modelos/MA_PAYMENTTYPE';

@Component({
  selector: 'app-formapagolist',
  templateUrl: './formapagolist.component.html',
  styleUrls: []
})
export class FormapagolistComponent {
  eFormaPago: MA_PAYMENTTYPE[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getFormaPagos().then((resp: MA_PAYMENTTYPE[]) => {
      this.eFormaPago = resp;
      this.bol_cargando = false;
    }).catch(err => this.ShowError(err));
  }

  borrarServicio(codigo: string) {
    if (confirm("Seguro de eliminar?")) {
      this.maestroServicio.borrarFormaPago(codigo).then(
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
