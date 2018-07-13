import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family } from '../../shared/modelos/MA_FAMILY';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styles: []
})
export class FamiliaComponent {
  forma: FormGroup;
  eFamilia: Ma_Family;
  bol_nuevo: boolean = false;
  id: string = "";

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl('', Validators.required),
      'ID_FAMILY': new FormControl('', Validators.required),
      'DESCRIPTION_FAMILY': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eFamilia = this.maestroSevicio.getFamilia(this.id);
        this.forma.setValue({
          'ID_COMPANY': this.eFamilia.ID_COMPANY,
          'ID_FAMILY': this.eFamilia.ID_FAMILY,
          'DESCRIPTION_FAMILY': this.eFamilia.DESCRIPTION_FAMILY
        });
      }
    })

  }




  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eFamilia = new Ma_Family(1,
        this.forma.get('ID_FAMILY').value,
        this.forma.get('DESCRIPTION_FAMILY').value);

      this.maestroSevicio.nuevaFamilia(this.eFamilia);
      this.router.navigate(['/familias'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }

  }

}
