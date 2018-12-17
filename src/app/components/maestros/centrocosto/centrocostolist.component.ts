import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Center_Cost } from '../../shared/modelos/Ma_Center_Cost';


@Component({
  selector: 'app-centrocostolist',
  templateUrl: './centrocostolist.component.html',
  styles: []
})
export class CentrocostolistComponent {
  eCentroCosto: Ma_Center_Cost[] = [];

  constructor(private maestroServicio: MaestrosService) {
    maestroServicio.getCentrocostos()
      .subscribe((resp: Ma_Center_Cost[]) => {
        this.eCentroCosto = resp;
      });
  };

  borrarCentrocosto(id: string) {
    let eliminar = confirm("¿Deseas eliminar este registro?");
    if (eliminar) {
      this.maestroServicio.borrarCentroCosto(id);
      
      this.maestroServicio.getCentrocostos()
        .subscribe((resp: Ma_Center_Cost[]) => {
          this.eCentroCosto = resp;
        });
    }
  }

}
