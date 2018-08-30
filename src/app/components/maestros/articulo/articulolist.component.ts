import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Article } from '../../shared/modelos/Ma_Article';

@Component({
  selector: 'app-articulolist',
  templateUrl: './articulolist.component.html',
  styles: []
})
export class ArticulolistComponent {
  eArticulo: Ma_Article[];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }
  cargarListado() {
    this.maestroServicio.getArticulos()
      .subscribe((resp: Ma_Article[]) => {
        this.eArticulo = resp;
        console.log(resp);
      });
  }

  borrarArticulo(codigo: number) {
    this.maestroServicio.borrarArticulo(codigo);
    this.cargarListado();
  }

}
