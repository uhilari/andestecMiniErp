import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family_Sub } from '../../shared/modelos/Ma_Family_Sub';

@Component({
  selector: 'app-familiasublist',
  templateUrl: './familiasublist.component.html',
  styles: []
})

export class FamiliasublistComponent {
  eFamiliaSub: Ma_Family_Sub[];
  constructor(private maestroServicio: MaestrosService) {
    maestroServicio.getFamiliasSub()
      .subscribe((resp: Ma_Family_Sub[]) => {
        this.eFamiliaSub = resp;
        console.log(resp);
      });
  }

  borrarSubFamilia(id: string) {
    this.maestroServicio.borrarSubFamilia(id);
  }

}
