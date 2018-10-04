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
          .subscribe((res: MA_TYPEPRICE) => {
            this.forma.get('TP_ID').setValue(res.TP_ID);
            this.forma.get('TP_DES').setValue(res.TP_DES)
          });
      }
    });
  }

  guardarCambios() {
    this.cargando = true;
    this.eTipoPrecio = new MA_TYPEPRICE(
      this.forma.get('TP_ID').value,
      this.forma.get('TP_DES').value, 1);
    this.maestroSevicio.nuevoTipoPrecio(this.eTipoPrecio);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }

  ngOnInit() {
  }

}
