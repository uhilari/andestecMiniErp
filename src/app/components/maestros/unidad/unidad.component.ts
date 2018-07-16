import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Unit } from '../../shared/modelos/Ma_Unit';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class UnidadComponent {
  forma: FormGroup;
  eUnidad: Ma_Unit;
  bol_nuevo: boolean = false;
  id: string = "";

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl(''),
      'ID_UNIT': new FormControl('', Validators.required),
      'DESCRIPTION_UNIT': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eUnidad = this.maestroSevicio.getUnidad(this.id);
        this.forma.setValue({
          'ID_COMPANY': this.eUnidad.ID_COMPANY,
          'ID_UNIT': this.eUnidad.ID_UNIT,
          'DESCRIPTION_UNIT': this.eUnidad.DESCRIPTION_UNIT
        });
      }
    })

  }



  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eUnidad = new Ma_Unit(1,
        this.forma.get('ID_UNIT').value,
        this.forma.get('DESCRIPTION_UNIT').value);

      this.maestroSevicio.nuevaUnidad(this.eUnidad);
      this.router.navigate(['/unidades'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }

  }

}
