import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_SALESTYPE } from '../../shared/modelos/MA_SALESTYPE';

@Component({
  selector: 'app-tipoventalist',
  templateUrl: './tipoventalist.component.html',
  styleUrls: []
})
export class TipoventalistComponent {
  eTipoventa: MA_SALESTYPE[];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }
  cargarListado() {
    this.maestroServicio.getTipoVentas().subscribe((resp: MA_SALESTYPE[]) => {
      this.eTipoventa = resp;
    });
  }

  borrarTipoventa(codigo: string) {
    this.maestroServicio.borrarTipoVenta(codigo);
    this.cargarListado();
  }


}
