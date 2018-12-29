import { Component, OnInit } from '@angular/core';
import { EREP_VTASXDIA } from '../../shared/modelos/EREP_VTASXDIA';
import { ReportesService } from '../../../services/reportes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventasxdia',
  templateUrl: './ventasxdia.component.html',
  styles: []
})
export class VentasxdiaComponent implements OnInit {

  eListado: EREP_VTASXDIA[];
  forma: FormGroup;
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private servicioReporte: ReportesService) { 
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
    this.servicioReporte.GetRepVentasporDia(f1, f2).then(
      (data: EREP_VTASXDIA[]) => {
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
