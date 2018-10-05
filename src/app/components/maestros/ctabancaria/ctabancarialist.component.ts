import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_BANKACCOUNT } from '../../shared/modelos/ECA_BANKACCOUNT';

@Component({
  selector: 'app-ctabancarialist',
  templateUrl: './ctabancarialist.component.html',
  styles: []
})
export class CtabancarialistComponent implements OnInit {
  
  eCtacte: ECA_BANKACCOUNT[];
  
  constructor(    private _ms: MaestrosService     ) { 
    _ms.getCuentaBancarias()
    .subscribe((resp: ECA_BANKACCOUNT[]) => {
      this.eCtacte = resp;
    });

  }

  borrarCtacte(id: string) {
    this._ms.borrarCuentaBancaria(id);    
  }

  ngOnInit() {
  }

}
