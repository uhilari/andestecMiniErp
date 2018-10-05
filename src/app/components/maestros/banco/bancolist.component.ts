import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { EMA_BANK } from '../../shared/modelos/EMA_BANK';

@Component({
  selector: 'app-bancolist',
  templateUrl: './bancolist.component.html',
  styles: []
})
export class BancolistComponent implements OnInit {

  eBanco:EMA_BANK[];

  constructor(private _ms: MaestrosService) { 
    _ms.getBancos()
    .subscribe((resp: EMA_BANK[]) => {
      this.eBanco = resp;
    });
  };

  borrarBanco(id: string) {
    this._ms.borrarBanco(id);    
  }
  
  ngOnInit() {
  }

}
