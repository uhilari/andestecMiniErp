import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EREP_SELVTAXSEL } from '../../shared/modelos/EREP_SELVTAXSEL';
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';


@Component({
  selector: 'app-ventasvendedor',
  templateUrl: './ventasvendedor.component.html',
  styleUrls: []
})
export class VentasvendedorComponent implements OnInit {

  eListado: EREP_SELVTAXSEL[];
  eVendedor: EMA_SELLER[];
  forma: FormGroup;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService
  ) {

    servicioMaestro.getVendedores().subscribe(
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
    })
  }

  ngOnInit() {
  }

  CargarReporte() {
    let vendedor: string = this.forma.get('cmbvendedor').value;
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;

    this.servicioReporte.GetRepVentasxVendedor(vendedor, f1, f2).subscribe(
      (data: EREP_SELVTAXSEL[]) => { this.eListado = data; }
    );                                    
  }

  imprimir() {
    window.print();
  }

}
