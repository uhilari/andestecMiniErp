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

  constructor(private maestroServicio: MaestrosService) {
    maestroServicio.getFamilias()
      .subscribe((resp: Ma_Family[]) => {
        this.eFamilia = resp;
        console.log(resp);
      });
  }

  borrarFamilia(id: string) {
    this.maestroServicio.borrarFamilia(id);
  }

}
