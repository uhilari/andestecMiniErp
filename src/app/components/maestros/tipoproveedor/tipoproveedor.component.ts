import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPEPROVIDER } from '../../shared/modelos/MA_TYPEPROVIDER';

@Component({
  selector: 'app-tipoproveedor',
  templateUrl: './tipoproveedor.component.html',
  styles: []
})
export class TipoproveedorComponent implements OnInit {
  forma: FormGroup;
  eTipoProveedor: MA_TYPEPROVIDER;
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
      'TP_ID': new FormControl('', Validators.required),
      'TP_DES': new FormControl('', Validators.required),
      'TP_ISTATUS': new FormControl('A', Validators.required)
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {

        this.maestroSevicio.getTipoProveedor(this.id)
          .subscribe((res: MA_TYPEPROVIDER) => {
            this.forma.get('TP_ID').setValue(res.TP_ID);
            this.forma.get('TP_DES').setValue(res.TP_DES)
            this.forma.get('TP_ISTATUS').setValue(res.TP_ISTATUS)
          });
      }
    })

  }

  guardarCambios() {
    this.cargando = true;
    this.eTipoProveedor = new MA_TYPEPROVIDER(
      this.forma.get('TP_ID').value,
      this.forma.get('TP_DES').value,
      this.forma.get('TP_ISTATUS').value, 1);

    this.maestroSevicio.nuevoTipoProveedor(this.eTipoProveedor).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo el tipo de proveedor correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/tipoproveedores']);
          }, 1500);
        }
      }
    ).catch(err => this.ShowError(err));

  }

  ngOnInit() {
  }

  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

}
