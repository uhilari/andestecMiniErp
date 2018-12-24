import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';

import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EREP_REGVENTAS } from '../../shared/modelos/EREP_REGVENTAS';

@Component({
  selector: 'app-registroventas',
  templateUrl: './registroventas.component.html',
  styleUrls: []
})
export class RegistroventasComponent implements OnInit {

  eListado: EREP_REGVENTAS[];
  forma: FormGroup;
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService) {

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" +
      (x.getMonth() + 1).toString().padStart(2, '0') + '-' +
      x.getDate().toString().padStart(2, '0');

    this.forma = new FormGroup({
      'txtfec1': new FormControl(fechaReg, Validators.required),
      'txtfec2': new FormControl(fechaReg, Validators.required)
    })

  }

  ngOnInit() {
  }


  CargarReporte() {
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;
    this.bol_cargando = true;
    this.servicioReporte.GetRepRegVentas(f1, f2).then(
      (data: EREP_REGVENTAS[]) => {
        this.eListado = data;
        this.bol_cargando = false;
      }
    ).catch(err => this.ShowError(err));
  }

  imprimir() {
    window.print();
  }

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }
  
}
