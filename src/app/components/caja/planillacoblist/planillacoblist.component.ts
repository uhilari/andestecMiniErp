import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../../services/caja.service';
import { ECA_COLLECTION } from '../../shared/modelos/ECA_COLLECTION';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-planillacoblist',
  templateUrl: './planillacoblist.component.html',
  styles: []
})
export class PlanillacoblistComponent implements OnInit {

  ePlanilla: ECA_COLLECTION[] = [];
  forma: FormGroup;

  constructor(private _cs: CajaService) {

    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');

    this.forma = new FormGroup({
      'FECHAINI': new FormControl(fechaReg, Validators.required),
      'FECHAFIN': new FormControl(fechaReg, Validators.required)
    });
  }

  ngOnInit() {
  }

  ListarListadoPlanillaCab() {
    let fec1: string = this.forma.get('FECHAINI').value;
    let fec2: string = this.forma.get('FECHAFIN').value;

    this._cs.getListadoPlanillaCab(fec1, fec2).subscribe(
      (data: ECA_COLLECTION[]) => { this.ePlanilla = data;console.log(this.ePlanilla);
       }
    );
  }


}
