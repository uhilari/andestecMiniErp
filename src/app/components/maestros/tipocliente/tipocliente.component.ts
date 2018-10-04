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
          .subscribe((res: MA_TYPECUSTOMER) => {
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
    this.maestroSevicio.nuevoTipoCliente(this.eTipoCliente);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }

}
