import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: []
})
export class VendedorComponent {
  forma: FormGroup;
  eUnidad: EMA_SELLER;
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
      'SE_ID': new FormControl('', Validators.required),
      'SE_DESCRIPCION': new FormControl('', Validators.required),
      'SE_DNI': new FormControl(''),
      'SE_ADD': new FormControl(''),
      'SE_PHONE': new FormControl(''),
      'SE_EMAIL': new FormControl(''),
      'SE_ISTATUS': new FormControl('A')
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.maestroSevicio.getVendedor(this.id)
          .then((res: EMA_SELLER) => {
            this.forma.get('SE_ID').setValue(res.SE_ID);
            this.forma.get('SE_DESCRIPCION').setValue(res.SE_DESCRIPCION)
            this.forma.get('SE_DNI').setValue(res.SE_DNI)
            this.forma.get('SE_ADD').setValue(res.SE_ADD)
            this.forma.get('SE_PHONE').setValue(res.SE_PHONE)
            this.forma.get('SE_EMAIL').setValue(res.SE_EMAIL)
            this.forma.get('SE_ISTATUS').setValue(res.SE_ISTATUS)
          });
      }
    })

  }


  guardarCambios() {
    this.cargando = true;
    this.maestroSevicio.nuevoVendedor(
      new EMA_SELLER(
        this.forma.get('SE_ID').value,
        this.forma.get('SE_DESCRIPCION').value, 1,
        this.forma.get('SE_DNI').value,
        this.forma.get('SE_ADD').value,
        this.forma.get('SE_PHONE').value,
        this.forma.get('SE_EMAIL').value,
        this.forma.get('SE_ISTATUS').value)).then(
          res => {
            if (res == "ok") {
              this.cargando = false;
              this.bol_msj = true;
              this.msj_ok = "se grabo el vendedor correctamente ";

              setTimeout(() => {
                this.forma.reset();
                this.bol_msj = false;
                this.router.navigate(['/vendedores']);
              }, 1500);
            }
          }
        );


  }

  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }



}
