import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Center_Cost } from '../../shared/modelos/Ma_Center_Cost';


@Component({
  selector: 'app-centrocostolist',
  templateUrl: './centrocostolist.component.html',
  styles: []
})
export class CentrocostolistComponent {

  eCentroCosto: Ma_Center_Cost[];
  constructor(maestroServicio: MaestrosService) {
    this.eCentroCosto = maestroServicio.getCentrocostos();
  };


  borrarCentrocosto(id: number) {
    console.log("borrando centro de costo: ", id);
  }

}
