import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family_Sub } from '../../shared/modelos/Ma_Family_Sub';

@Component({
  selector: 'app-familiasub',
  templateUrl: './familiasub.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class FamiliasubComponent {
  forma: FormGroup;
  eFamiliasub: Ma_Family_Sub;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({      
      'ID_FAMILY': new FormControl('', Validators.required),
      'ID_FAMILY_SUB': new FormControl('', Validators.required),
      'DESCRIPTION_FAMILY_SUB': new FormControl('', Validators.required),
    });


    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getFamiliaSub(this.id)
          .subscribe((res: Ma_Family_Sub) => {            
            this.forma.get('ID_FAMILY').setValue(res.ID_FAMILY);
            this.forma.get('ID_FAMILY_SUB').setValue(res.ID_FAMILY_SUB)
            this.forma.get('DESCRIPTION_FAMILY_SUB').setValue(res.DESCRIPTION_FAMILY_SUB)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;
    this.eFamiliasub = new Ma_Family_Sub(1,
      this.forma.get('ID_FAMILY').value,
      this.forma.get('ID_FAMILY_SUB').value,
      this.forma.get('DESCRIPTION_FAMILY_SUB').value);

    this.maestroSevicio.nuevaFamiliaSub(this.eFamiliasub);
    this.forma.reset();
    this.cargando = false;
  }

}
