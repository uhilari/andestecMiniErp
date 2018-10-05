import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_COLLECTOR } from '../../shared/modelos/ECA_COLLECTOR';


@Component({
  selector: 'app-cobradorlist',
  templateUrl: './cobradorlist.component.html',
  styles: []
})
export class CobradorlistComponent implements OnInit {
  eCobrador: ECA_COLLECTOR[];

  constructor(private _ms: MaestrosService) {
    _ms.getCobradores()
      .subscribe((resp: ECA_COLLECTOR[]) => {
        this.eCobrador = resp;
      });
  }

  borrarCobrador(id: string) {
    this._ms.borrarCobrador(id);    
  }

  ngOnInit() {
  }

}
