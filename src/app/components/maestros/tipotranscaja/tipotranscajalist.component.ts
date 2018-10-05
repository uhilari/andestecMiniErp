import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_TRANSCOLLECTION } from '../../shared/modelos/ECA_TRANSCOLLECTION';

@Component({
  selector: 'app-tipotranscajalist',
  templateUrl: './tipotranscajalist.component.html',
  styles: []
})
export class TipotranscajalistComponent implements OnInit {

  eTipos: ECA_TRANSCOLLECTION[];
  constructor(private _ms: MaestrosService) {
    _ms.getTipoTransaccionesCaja()
      .subscribe((resp: ECA_TRANSCOLLECTION[]) => {
        this.eTipos = resp;
      });
  }

  borrarTipoTransCaja(id: string) {
    this._ms.borrarTipoTransaccionCaja(id);    
  }

  ngOnInit() {
  }

}
