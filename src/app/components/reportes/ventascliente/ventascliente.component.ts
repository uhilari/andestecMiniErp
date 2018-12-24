import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { EREP_SELVTAXCUSTO } from '../../shared/modelos/EREP_SELVTAXCUSTO';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-ventascliente',
  templateUrl: './ventascliente.component.html',
  styleUrls: []
})
export class VentasclienteComponent implements OnInit {

  eListado: EREP_SELVTAXCUSTO[];
  eClientes: Ma_Customer[];
  forma: FormGroup;
  bol_cargando: boolean;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService) {

    this.servicioMaestro.getClientes().then(
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
      'f_chkTodos': new FormControl('')
    })


  }

  ngOnInit() {
  }

  CargarReporte() {
    if (!this.forma.get('f_chkTodos').value) {
      if (!this.forma.get('cmbcliente').value) {
        swal("Seleccione un cliente para continuar", { icon: "warning" });
        return;
      }
    }

    let cliente: string = this.forma.get('cmbcliente').value;
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;

    if (this.forma.get('f_chkTodos').value) {
      cliente = "0";
    }


    this.bol_cargando = true;
    this.servicioReporte.GetRepVentasxCliente(cliente, f1, f2).then(
      (data: EREP_SELVTAXCUSTO[]) => { this.eListado = data; this.bol_cargando = false }
    );
  }

  imprimir() {
    window.print();
  }


}
