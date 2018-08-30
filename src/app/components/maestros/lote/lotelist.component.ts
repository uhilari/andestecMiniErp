import { Component } from '@angular/core';
import { Ma_Lot } from '../../shared/modelos/Ma_Lot';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-lotelist',
  templateUrl: './lotelist.component.html',
  styleUrls: []
})
export class LotelistComponent  {
  eLote: Ma_Lot[];

  constructor(private maestroServicio: MaestrosService) {
  maestroServicio.getLotes()
    .subscribe((resp: Ma_Lot[]) => {
      this.eLote = resp;
      console.log(resp);
    });
  };

  borrarLote(id: string) {
    this.maestroServicio.borrarLote(id);    
  }


}
