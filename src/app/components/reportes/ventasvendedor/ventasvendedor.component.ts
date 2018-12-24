import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EREP_SELVTAXSEL } from '../../shared/modelos/EREP_SELVTAXSEL';
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';
declare var swal: any;

@Component({
  selector: 'app-ventasvendedor',
  templateUrl: './ventasvendedor.component.html',
  styleUrls: []
})
export class VentasvendedorComponent implements OnInit {

  eListado: EREP_SELVTAXSEL[];
  eVendedor: EMA_SELLER[];
  forma: FormGroup;
  bol_cargando: boolean;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService
  ) {

    this.servicioMaestro.getVendedores().then(
      (data: EMA_SELLER[]) => { this.eVendedor = data }
    );

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" +
      (x.getMonth() + 1).toString().padStart(2, '0') + '-' +
      x.getDate().toString().padStart(2, '0');

    this.forma = new FormGroup({
      'txtfec1': new FormControl(fechaReg, Validators.required),
      'txtfec2': new FormControl(fechaReg, Validators.required),
      'cmbvendedor': new FormControl('', Validators.required),
      'f_chkTodos': new FormControl('')
    })
  }

  ngOnInit() {
  }

  ver(evento: any) {
    console.log(evento.currentTarget.checked);
  }

  CargarReporte() {

    if (!this.forma.get('f_chkTodos').value) {
      if (!this.forma.get('cmbvendedor').value) {
        swal("Seleccione un vendedor para continuar", { icon: "warning" });
        return;
      }
    }

    let vendedor: string = this.forma.get('cmbvendedor').value;
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;

    if (this.forma.get('f_chkTodos').value) {
      vendedor = "0";
    }

    this.bol_cargando = true;
    this.servicioReporte.GetRepVentasxVendedor(vendedor, f1, f2).then(
      (data: EREP_SELVTAXSEL[]) => {
        this.eListado = data;
        this.bol_cargando = false;
      }
    );
  }

  imprimir() {
    window.print();
  }

}
