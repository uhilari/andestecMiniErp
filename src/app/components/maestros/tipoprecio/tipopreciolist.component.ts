import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPEPRICE } from '../../shared/modelos/MA_TYPEPRICE';

@Component({
  selector: 'app-tipopreciolist',
  templateUrl: './tipopreciolist.component.html',
  styles: []
})
export class TipopreciolistComponent implements OnInit {
  eTipoprecio: MA_TYPEPRICE[];
  constructor(private maestroServicio: MaestrosService) { this.cargarListado()}

  cargarListado() {
    this.maestroServicio.getTipoPrecios().subscribe((resp: MA_TYPEPRICE[]) => {
      this.eTipoprecio = resp;
    });
  }
  borrarProyecto(codigo: string) {
    this.maestroServicio.borrarTipoPrecio(codigo);
    this.cargarListado();
  }

  ngOnInit() {
  }

}
