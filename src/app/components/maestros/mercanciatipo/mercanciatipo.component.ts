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
  bol_error: boolean;
  msj_error: string;
  msj_ok: string;

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
          .then((res: Ma_Commodity_Type) => {
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

    this.maestroSevicio.nuevoCommodity(this.eCommodity).then(
      res => {
        if (res == "ok") {          
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo el tipo de mercancia correctamente";

          setTimeout(() => {
            this.bol_msj = false;
            this.forma.reset();
            this.router.navigate(['/mercanciatipos']);
          }, 2000);
        }
      }
    ).catch(err => this.ShowError(err));

  }

  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

}
