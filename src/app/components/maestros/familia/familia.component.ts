import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family } from '../../shared/modelos/MA_FAMILY';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class FamiliaComponent {
  forma: FormGroup;
  eFamilia: Ma_Family;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_FAMILY': new FormControl('', Validators.required),
      'DESCRIPTION_FAMILY': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getFamilia(this.id)
          .subscribe((res: Ma_Family) => {
            this.forma.get('ID_FAMILY').setValue(res.ID_FAMILY);
            this.forma.get('DESCRIPTION_FAMILY').setValue(res.DESCRIPTION_FAMILY)
          });
          this.forma.get('ID_FAMILY')
      }
    })

  }

  guardarCambios() {
    this.cargando = true;
    this.eFamilia = new Ma_Family(1,
      this.forma.get('ID_FAMILY').value,
      this.forma.get('DESCRIPTION_FAMILY').value);

    this.maestroSevicio.nuevaFamilia(this.eFamilia);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
      this.router.navigate(['/familias']);
    }, 1500);
  }

}
