import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family_Sub } from '../../shared/modelos/Ma_Family_Sub';

@Component({
  selector: 'app-familiasub',
  templateUrl: './familiasub.component.html',
  styles: []
})
export class FamiliasubComponent {
  forma: FormGroup;
  eFamiliasub: Ma_Family_Sub;
  bol_nuevo: boolean = false;
  id: string = "";

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl(''),
      'ID_FAMILY': new FormControl('', Validators.required),
      'ID_FAMILY_SUB': new FormControl('', Validators.required),
      'DESCRIPTION_FAMILY_SUB': new FormControl('', Validators.required),
    });


    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eFamiliasub = this.maestroSevicio.getFamiliaSub(this.id);
        this.forma.setValue({
          'ID_COMPANY': this.eFamiliasub.ID_COMPANY,
          'ID_FAMILY': this.eFamiliasub.ID_FAMILY,
          'ID_FAMILY_SUB': this.eFamiliasub.ID_FAMILY_SUB,
          'DESCRIPTION_FAMILY_SUB': this.eFamiliasub.DESCRIPTION_FAMILY_SUB
        });
      }
    })

  }



  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eFamiliasub = new Ma_Family_Sub(1,
        this.forma.get('ID_FAMILY').value,
        this.forma.get('ID_FAMILY_SUB').value,
        this.forma.get('DESCRIPTION_FAMILY_SUB').value);

      this.maestroSevicio.nuevaFamiliaSub(this.eFamiliasub);
      this.router.navigate(['/familiassub'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }
  }

}
