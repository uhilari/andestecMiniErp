import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_PAYMENTTYPE } from '../../shared/modelos/MA_PAYMENTTYPE';

@Component({
  selector: 'app-formapagolist',
  templateUrl: './formapagolist.component.html',
  styleUrls: []
})
export class FormapagolistComponent {
  eFormaPago: MA_PAYMENTTYPE[];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.maestroServicio.getFormaPagos().subscribe((resp: MA_PAYMENTTYPE[]) => {
      this.eFormaPago = resp;
      console.log(resp);

    });
  }

  borrarServicio(codigo: string) {
    this.maestroServicio.borrarFormaPago(codigo);
    this.cargarListado();
  }

}
