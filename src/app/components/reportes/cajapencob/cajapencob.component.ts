import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes.service';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { MaestrosService } from 'src/app/services/maestros.service';
import { ERE_DOCPENDICOB } from '../../shared/modelos/ERE_DOCPENDICOB';
declare var swal: any;

@Component({
  selector: 'app-cajapencob',
  templateUrl: './cajapencob.component.html',
  styles: []
})
export class CajapencobComponent implements OnInit {

  forma: FormGroup;
  tipoRep: string;
  eClientes: Ma_Customer[];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;
  eListado : ERE_DOCPENDICOB[] = [];

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {


    route.params.subscribe(parametros => {
      this.tipoRep = parametros['tipo'];
    })

    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" +
      (x.getMonth() + 1).toString().padStart(2, '0') +
      '-' + x.getDate().toString().padStart(2, '0');


    this.forma = new FormGroup({
      'cmbcliente': new FormControl('', Validators.required),
      'txtfec1': new FormControl(fechaReg, Validators.required),
      'txtfec2': new FormControl(fechaReg, Validators.required),
      'f_chkTodos': new FormControl('')
    });




  }

  ngOnInit() {

    this.servicioMaestro.getClientes().then(
      (data: Ma_Customer[]) => { this.eClientes = data }
    );

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
    this.servicioReporte.GetRepDocumentosPendientesCobrados(this.tipoRep, cliente, f1, f2).then(
      (data: ERE_DOCPENDICOB[]) => {
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
