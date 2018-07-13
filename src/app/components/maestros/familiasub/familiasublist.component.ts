import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family_Sub } from '../../shared/modelos/Ma_Family_Sub';

@Component({
  selector: 'app-familiasublist',
  templateUrl: './familiasublist.component.html',
  styles: []
})

export class FamiliasublistComponent  {
  eFamiliaSub: Ma_Family_Sub[];
  constructor(maestroServicio: MaestrosService) {
    this.eFamiliaSub = maestroServicio.getFamiliasSub();
   }

   borrarFamiliaSub(id: number) {
    console.log("borrando familia Sub: ", id);
  }

}
