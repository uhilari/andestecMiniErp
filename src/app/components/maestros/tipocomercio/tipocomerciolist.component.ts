import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPECOMMERCE } from '../../shared/modelos/MA_TYPECOMMERCE';

@Component({
  selector: 'app-tipocomerciolist',
  templateUrl: './tipocomerciolist.component.html',
  styles: []
})
export class TipocomerciolistComponent implements OnInit {
  eTipocomercio: MA_TYPECOMMERCE[];
  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado()
  }
  cargarListado() {
    this.maestroServicio.getTipoComercios().subscribe((resp: MA_TYPECOMMERCE[]) => {
      this.eTipocomercio = resp;
    });
  }
  borrarProyecto(codigo: string) {
    this.maestroServicio.borrarTipoComercio(codigo);
    this.cargarListado();
  }
  ngOnInit() {
  }

}
