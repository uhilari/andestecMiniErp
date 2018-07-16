import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Article } from '../../shared/modelos/Ma_Article';

@Component({
  selector: 'app-articulolist',
  templateUrl: './articulolist.component.html',
  styles: []
})
export class ArticulolistComponent  {
  eArticulo: Ma_Article [];

  constructor(private maestroServicio: MaestrosService) {
    this.eArticulo = maestroServicio.getArticulos();
   }


   borrarArticulo(codigo: number) {
    console.log("Borrando articulo: ", codigo);
  }

}
