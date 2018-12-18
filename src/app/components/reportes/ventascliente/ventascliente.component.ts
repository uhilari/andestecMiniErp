import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { EREP_SELVTAXCUSTO } from '../../shared/modelos/EREP_SELVTAXCUSTO';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventascliente',
  templateUrl: './ventascliente.component.html',
  styleUrls: []
})
export class VentasclienteComponent implements OnInit {

  eListado: EREP_SELVTAXCUSTO[];
  eClientes: Ma_Customer[];
  forma: FormGroup;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService) {

    servicioMaestro.getClientes().then(
      (data: Ma_Customer[]) => { this.eClientes = data }
    );


    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" +
      (x.getMonth() + 1).toString().padStart(2, '0') + '-' +
      x.getDate().toString().padStart(2, '0');

    this.forma = new FormGroup({
      'txtfec1': new FormControl(fechaReg, Validators.required),
      'txtfec2': new FormControl(fechaReg, Validators.required),
      'cmbcliente': new FormControl('', Validators.required),
    })


  }

  ngOnInit() {
  }

  CargarReporte() {
    let cliente: string = this.forma.get('cmbcliente').value;
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;

    this.servicioReporte.GetRepVentasxCliente(cliente, f1, f2).subscribe(
      (data: EREP_SELVTAXCUSTO[]) => { this.eListado = data; }
    );
  }

  imprimir() {
    window.print();
  }


}
