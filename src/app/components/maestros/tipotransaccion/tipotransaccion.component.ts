import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_TipoTransaccion } from '../../shared/modelos/Ma_TipoTransaccion';

@Component({
  selector: 'app-tipotransaccion',
  templateUrl: './tipotransaccion.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})

export class TipotransaccionComponent {
  forma: FormGroup;
  eTipoT: Ma_TipoTransaccion;
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
      'f_TT_CODIGO': new FormControl('', Validators.required),
      'f_TT_DESCRIPCION': new FormControl('', Validators.required),
      'f_TT_INGSAL': new FormControl('', Validators.required),
      'f_TT_COST': new FormControl('', Validators.required),
      'f_TT_TYPE': new FormControl('', Validators.required),
    });


    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.maestroSevicio.getTipoT(this.id)
          .subscribe((res: Ma_TipoTransaccion) => {
            this.forma.get('f_TT_CODIGO').setValue(res.TT_CODIGO);
            this.forma.get('f_TT_DESCRIPCION').setValue(res.TT_DESCRIPCION);
            this.forma.get('f_TT_INGSAL').setValue(res.TT_INGSAL)
            this.forma.get('f_TT_COST').setValue(res.TT_COST)
            this.forma.get('f_TT_TYPE').setValue(res.TT_TYPE)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;
    this.eTipoT = new Ma_TipoTransaccion(
      this.forma.get('f_TT_CODIGO').value,
      this.forma.get('f_TT_DESCRIPCION').value,
      this.forma.get('f_TT_INGSAL').value, 1,
      this.forma.get('f_TT_COST').value,
      this.forma.get('f_TT_TYPE').value);
    this.maestroSevicio.nuevoTipoT(this.eTipoT).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo el tipo de transaccion correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/tipotransacciones']);
          }, 1500);
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
