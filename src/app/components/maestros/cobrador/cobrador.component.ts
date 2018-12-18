import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_COLLECTOR } from '../../shared/modelos/ECA_COLLECTOR';


@Component({
  selector: 'app-cobrador',
  templateUrl: './cobrador.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class CobradorComponent implements OnInit {

  eCobrador: ECA_COLLECTOR;
  forma: FormGroup;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  bol_error: boolean;
  msj_error: string;
  msj_ok: string;

  constructor(
    private _ms: MaestrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.forma = new FormGroup({
      'CO_IDCOLLECTOR': new FormControl('', Validators.required),
      'CO_DESCRIPTION': new FormControl('', Validators.required),
      'CO_DOCUMENT': new FormControl(''),
      'CO_MAIL': new FormControl(''),
      'CO_MOVIL': new FormControl(''),
      'CO_ISTATUS': new FormControl('A'),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this._ms.getCobrador(this.id)
          .subscribe((res: ECA_COLLECTOR) => {
            this.forma.get('CO_IDCOLLECTOR').setValue(res.CO_IDCOLLECTOR);
            this.forma.get('CO_DESCRIPTION').setValue(res.CO_DESCRIPTION)
            this.forma.get('CO_DOCUMENT').setValue(res.CO_DOCUMENT)
            this.forma.get('CO_MAIL').setValue(res.CO_MAIL);
            this.forma.get('CO_MOVIL').setValue(res.CO_MOVIL)
            this.forma.get('CO_ISTATUS').setValue(res.CO_ISTATUS)
          })
      }

    });

  }


  guardarCambios() {
    this.cargando = true;
    this.eCobrador = new ECA_COLLECTOR(
      this.forma.get('CO_IDCOLLECTOR').value,
      this.forma.get('CO_DESCRIPTION').value,
      this.forma.get('CO_DOCUMENT').value,
      this.forma.get('CO_MAIL').value,
      this.forma.get('CO_MOVIL').value,
      this.forma.get('CO_ISTATUS').value,
      1);

    this._ms.nuevoCobrador(this.eCobrador).then(
      res => {
        if (res == "ok") {
          this.forma.reset();
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo el cobrador correctamente."
          setTimeout(() => {
            this.bol_msj = false;
            this.forma.reset();
            this.router.navigate(['/cobradores']);
          }, 1500);
        }
      }

    ).catch(
      error => this.ShowError(error)
    );

  }


  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  ngOnInit() {
  }

}
