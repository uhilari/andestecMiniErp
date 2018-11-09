import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja.service';
import { ECA_COLLECTION } from '../../shared/modelos/ECA_COLLECTION';
import { EPLANILLADET } from '../../shared/modelos/EPLANILLADET';

@Component({
  selector: 'app-planillacobnuevo',
  templateUrl: './planillacobnuevo.component.html',
  styles: []
})
export class PlanillacobnuevoComponent {
  forma: FormGroup;
  idPla: string = "";
  fecPla: string = "";
  bolgrabar: boolean = false;
  bolagregar: boolean = false;
  eDetalles: EPLANILLADET[] = [];

  constructor(
    private _vs: CajaService,
    private router: Router,
    private route: ActivatedRoute) {


    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');
    console.log(fechaReg);

    this.forma = new FormGroup({
      'CO_ID': new FormControl('0'.padStart(10, '0'), Validators.required),
      'CO_DATE': new FormControl(fechaReg, Validators.required),
      'CO_TC': new FormControl('0.00', Validators.required)
    });


    route.params.subscribe(parametros => {
      this.idPla = parametros['id'];
      this.fecPla = parametros['fecha'];
      console.log(parametros['id']);
      console.log('fecha param:', this.fecPla);
    })



    if (this.idPla !== "nuevo") {
      this.bolgrabar = true;


      let arr = this.fecPla.split('/');
      let x: Date = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
      let fechaval: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');

      this.forma.get('CO_ID').setValue(this.idPla.padStart(10, '0'));
      this.forma.get('CO_DATE').setValue(fechaval);

      //cargar los documentos cobrados del detalle
      this._vs.getListadoPlanillaDet(this.idPla).subscribe(
        (data: EPLANILLADET[]) => { this.eDetalles = data }
      );

    } else {//nuevo
      this.bolgrabar = false;
      this.bolagregar = true;
    }


  }




  grabarPlanilla() {

    let ent = new ECA_COLLECTION(0, '', this.forma.get('CO_DATE').value, 'A', 0, 0, 0, '', '');
    //let id: number = this._vs.postGrabarPlanilla(ent);
    this.bolgrabar = true;
    this.bolagregar = false;

    this._vs.postGrabarPlanilla(ent).then(id => {
      console.log('formateado', id.toString().padStart(10, '0'));
      console.log('solo ID', id);

      this.idPla = id;
      this.fecPla = this.forma.get('CO_DATE').value;

      this.forma.get('CO_ID').setValue(id.toString().padStart(10, '0'));

    });

  }



}
