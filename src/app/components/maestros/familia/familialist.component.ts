import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family } from '../../shared/modelos/MA_FAMILY';

@Component({
  selector: 'app-familialist',
  templateUrl: './familialist.component.html',
  styles: []
})
export class FamilialistComponent {

  eFamilia: Ma_Family[];

  constructor(maestroServicio: MaestrosService) {
    this.eFamilia = maestroServicio.getFamilias();
  }

  borrarFamilia(id: number) {
    console.log("borrando familia: ", id);
  }

}
