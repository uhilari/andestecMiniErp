import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPECUSTOMER } from '../../shared/modelos/MA_TYPECUSTOMER';


@Component({
  selector: 'app-tipocliente',
  templateUrl: './tipocliente.component.html',
  styles: []
})
export class TipoclienteComponent implements OnInit {
  forma: FormGroup;
  eTipoCliente: MA_TYPECUSTOMER;
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
      'TC_ID': new FormControl('', Validators.required),
      'TC_DES': new FormControl('', Validators.required),
    });
    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getTipoCliente(this.id)
          .then((res: MA_TYPECUSTOMER) => {
            this.forma.get('TC_ID').setValue(res.TC_ID);
            this.forma.get('TC_DES').setValue(res.TC_DES)
          });
      }
    });
  }

  ngOnInit() {
  }

  guardarCambios() {
    this.cargando = true;
    this.eTipoCliente = new MA_TYPECUSTOMER(
      this.forma.get('TC_ID').value,
      this.forma.get('TC_DES').value, 1);
    this.maestroSevicio.nuevoTipoCliente(this.eTipoCliente).then(
      res => {
        if (res == "ok") {
          this.forma.reset();
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo el tipo de cliente correctamente";

          setTimeout(() => {
            this.bol_msj = false;
            this.router.navigate(['/tipoclientes']);
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
