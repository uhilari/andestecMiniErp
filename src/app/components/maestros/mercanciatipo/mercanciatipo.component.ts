import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Commodity_Type } from '../../shared/modelos/Ma_Commodity_Type';

@Component({
  selector: 'app-mercanciatipo',
  templateUrl: './mercanciatipo.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class MercanciatipoComponent {
  forma: FormGroup;
  eCommodity: Ma_Commodity_Type;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_COMMODITY_TYPE': new FormControl('', Validators.required),
      'DESCRIPTION_COMMODITY': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {

        this.maestroSevicio.getCommodity(this.id)
          .subscribe((res: Ma_Commodity_Type) => {
            this.forma.get('ID_COMMODITY_TYPE').setValue(res.ID_COMMODITY_TYPE);
            this.forma.get('DESCRIPTION_COMMODITY').setValue(res.DESCRIPTION_COMMODITY)
          });
      }
    })

  }

  guardarCambios() {
    this.cargando = true;
    this.eCommodity = new Ma_Commodity_Type(1,
      this.forma.get('ID_COMMODITY_TYPE').value,
      this.forma.get('DESCRIPTION_COMMODITY').value);

    this.maestroSevicio.nuevoCommodity(this.eCommodity);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }

}
