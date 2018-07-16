import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Commodity_Type } from '../../shared/modelos/Ma_Commodity_Type';


@Component({
  selector: 'app-mercanciatipolist',
  templateUrl: './mercanciatipolist.component.html',
  styles: []
})
export class MercanciatipolistComponent {

  eCommodity: Ma_Commodity_Type[];

  constructor(private maestroServicio: MaestrosService) {
    this.eCommodity = maestroServicio.getCommoditys();
  }

  borrarMercanciatipo(codigo: number) {
    console.log("Borrando tipo de mercancia: ", codigo);
  }

}
