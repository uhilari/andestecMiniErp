import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_SALESTYPE } from '../../shared/modelos/MA_SALESTYPE';

@Component({
  selector: 'app-tipoventa',
  templateUrl: './tipoventa.component.html',
  styleUrls: []
})
export class TipoventaComponent {
  forma: FormGroup;
  eTipoventa: MA_SALESTYPE;
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
    private route: ActivatedRoute
  ) {
    this.forma = new FormGroup({
      'ST_ID': new FormControl('', Validators.required),
      'ST_DES': new FormControl('', Validators.required),
    });
    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getTipoVenta(this.id)
          .then((res: MA_SALESTYPE) => {
            this.forma.get('ST_ID').setValue(res.ST_ID);
            this.forma.get('ST_DES').setValue(res.ST_DES)
          });
      }
    });
  }


  guardarCambios() {
    this.cargando = true;
    this.eTipoventa = new MA_SALESTYPE(
      this.forma.get('ST_ID').value,
      this.forma.get('ST_DES').value, 1);
    this.maestroSevicio.nuevoTipoVenta(this.eTipoventa).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo el tipo de vneta correctamente";
          
          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/tipoventas']);
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
