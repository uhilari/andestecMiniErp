import { Component } from '@angular/core';
import { MA_SALESPOINT } from '../../shared/modelos/MA_SALESPOINT';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-puntoventalist',
  templateUrl: './puntoventalist.component.html',
  styleUrls: []
})
export class PuntoventalistComponent {
  ePuntoVenta: MA_SALESPOINT[];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
   }

   cargarListado() {
    this.maestroServicio.getPuntoVentas().subscribe((resp: MA_SALESPOINT[]) => {
      this.ePuntoVenta = resp;      
    });
  }

  borrarPuntoVenta(codigo: string) {
    this.maestroServicio.borrarPuntoVenta(codigo);
    this.cargarListado();
  }

}
