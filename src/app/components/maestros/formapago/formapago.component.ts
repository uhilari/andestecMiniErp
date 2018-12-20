import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_PAYMENTTYPE } from '../../shared/modelos/MA_PAYMENTTYPE';

@Component({
  selector: 'app-formapago',
  templateUrl: './formapago.component.html',
  styleUrls: []
})
export class FormapagoComponent {
  forma: FormGroup;
  eFormapago: MA_PAYMENTTYPE;
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
      'PT_ID': new FormControl('', Validators.required),
      'PT_DES': new FormControl('', Validators.required),
      'PT_DAYS': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getFormaPago(this.id)
          .then((res: MA_PAYMENTTYPE) => {
            this.forma.get('PT_ID').setValue(res.PT_ID);
            this.forma.get('PT_DES').setValue(res.PT_DES)
            this.forma.get('PT_DAYS').setValue(res.PT_DAYS)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;
    this.eFormapago = new MA_PAYMENTTYPE(
      this.forma.get('PT_ID').value,
      this.forma.get('PT_DES').value, 1,
      this.forma.get('PT_DAYS').value);
    this.maestroSevicio.nuevoFormaPago(this.eFormapago).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo la forma de pago correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/formapagos']);
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
