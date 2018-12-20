import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPECOMMERCE } from '../../shared/modelos/MA_TYPECOMMERCE';


@Component({
  selector: 'app-tipocomercio',
  templateUrl: './tipocomercio.component.html',
  styles: []
})
export class TipocomercioComponent implements OnInit {
  forma: FormGroup;
  eTipoComercio: MA_TYPECOMMERCE;
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
        this.maestroSevicio.getTipoComercio(this.id)
          .then((res: MA_TYPECOMMERCE) => {
            this.forma.get('TC_ID').setValue(res.TC_ID);
            this.forma.get('TC_DES').setValue(res.TC_DES)
          });
      }
    });
  }

  guardarCambios() {
    
    this.cargando = true;
    this.eTipoComercio = new MA_TYPECOMMERCE(
      this.forma.get('TC_ID').value,
      this.forma.get('TC_DES').value, 1);

    this.maestroSevicio.nuevoTipoComercio(this.eTipoComercio).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo el tipo de comercio correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/tipocomercios']);
          }, 1500);

        }
      }
    );

  }

  ngOnInit() {
  }

}
