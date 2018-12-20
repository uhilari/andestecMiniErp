import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPEPRICE } from '../../shared/modelos/MA_TYPEPRICE';

@Component({
  selector: 'app-tipoprecio',
  templateUrl: './tipoprecio.component.html',
  styles: []
})
export class TipoprecioComponent implements OnInit {
  forma: FormGroup;
  eTipoPrecio: MA_TYPEPRICE;
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
    });
    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getTipoPrecio(this.id)
          .then((res: MA_TYPEPRICE) => {
            this.forma.get('TP_ID').setValue(res.TP_ID);
            this.forma.get('TP_DES').setValue(res.TP_DES)
          });
      }
    });
  }

  guardarCambios() {
    this.eTipoPrecio = new MA_TYPEPRICE(
      this.forma.get('TP_ID').value,
      this.forma.get('TP_DES').value, 1);
      this.cargando = true;
    this.maestroSevicio.nuevoTipoPrecio(this.eTipoPrecio).then(
      res => {
        if (res == "ok") {          
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo el tipo de precio corrrectamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/tipoprecios']);
          }, 1500);
        }
      }
    );

  }

  ngOnInit() {
  }

}
