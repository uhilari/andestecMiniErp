import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family_Sub } from '../../shared/modelos/Ma_Family_Sub';
import { Ma_Family } from '../../shared/modelos/MA_FAMILY';

@Component({
  selector: 'app-familiasub',
  templateUrl: './familiasub.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class FamiliasubComponent {
  forma: FormGroup;
  eFamiliasub: Ma_Family_Sub;
  eFamilias: Ma_Family[];
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  bol_error: boolean;
  msj_error: string;    
  msj_ok: string;

   bol_existe: boolean = false;

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_FAMILY': new FormControl('', Validators.required),
      'ID_FAMILY_SUB': new FormControl('', Validators.required),
      'DESCRIPTION_FAMILY_SUB': new FormControl('', Validators.required),
    });

    maestroSevicio.getFamilias().then((data: Ma_Family[]) => this.eFamilias = data);

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getFamiliaSub(this.id)
          .then((res: Ma_Family_Sub) => {
            this.forma.get('ID_FAMILY').setValue(res.ID_FAMILY);
            this.forma.get('ID_FAMILY_SUB').setValue(res.ID_FAMILY_SUB)
            this.forma.get('DESCRIPTION_FAMILY_SUB').setValue(res.DESCRIPTION_FAMILY_SUB)

          });
      }
    })
  }

validaExisste(){
  
    this.maestroSevicio.getFamiliaSub(this.forma.get('ID_FAMILY_SUB').value).then(
      (res: Ma_Family_Sub) => {              
        if (res.ID_FAMILY_SUB.toString().length > 0 || (this.id == "nuevo")) {
          // if ((res) || (this.id == "nuevo")) {
          this.ShowError("El codigo ya existe");          
        }
      }
    )
}

  guardarCambios() {
    
    this.cargando = true;
    this.eFamiliasub = new Ma_Family_Sub(1,
      this.forma.get('ID_FAMILY').value,
      this.forma.get('ID_FAMILY_SUB').value,
      this.forma.get('DESCRIPTION_FAMILY_SUB').value);

    this.maestroSevicio.nuevaFamiliaSub(this.eFamiliasub).then(
      res => {
        if (res == "ok") {          
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo la subfamilia correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/familiassub']);
          }, 1500);
        }
      }).catch(error => this.ShowError(error))
  }




  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

}
