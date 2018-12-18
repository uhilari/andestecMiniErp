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
  bol_error: boolean;
  msj_error: string;
  msj_ok: string;

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl(''),
      'ID_UNIT': new FormControl('', [Validators.required,Validators.maxLength(5)]),
      'DESCRIPTION_UNIT': new FormControl('', Validators.required),
      'COD_SUNAT': new FormControl('',Validators.maxLength(10)),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.maestroSevicio.getUnidad(this.id)
          .subscribe((res: Ma_Unit) => {
            this.forma.get('ID_COMPANY').setValue(res.ID_COMPANY);
            this.forma.get('ID_UNIT').setValue(res.ID_UNIT);
            this.forma.get('DESCRIPTION_UNIT').setValue(res.DESCRIPTION_UNIT)
            this.forma.get('COD_SUNAT').setValue(res.COD_SUNAT)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;
    this.eUnidad = new Ma_Unit(1,
      this.forma.get('ID_UNIT').value,
      this.forma.get('DESCRIPTION_UNIT').value,
      this.forma.get('COD_SUNAT').value);

    this.maestroSevicio.nuevaUnidad(this.eUnidad).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo la unidad correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/unidades']);
          }, 1500);
        }
      }
    ).catch(error => this.ShowError(error));


  }


  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

}
