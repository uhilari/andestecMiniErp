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
  cargando: boolean = false;
  bol_msj: boolean = false;

  constructor(
    private maestroSevicio: MaestrosService,
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
        this.maestroSevicio.getUnidad(this.id)
          .subscribe((res: Ma_Unit) => {
            this.forma.get('ID_COMPANY').setValue(res.ID_COMPANY);
            this.forma.get('ID_UNIT').setValue(res.ID_UNIT);
            this.forma.get('DESCRIPTION_UNIT').setValue(res.DESCRIPTION_UNIT)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;
    this.eUnidad = new Ma_Unit(1,
      this.forma.get('ID_UNIT').value,
      this.forma.get('DESCRIPTION_UNIT').value);
    this.maestroSevicio.nuevaUnidad(this.eUnidad);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }

}
