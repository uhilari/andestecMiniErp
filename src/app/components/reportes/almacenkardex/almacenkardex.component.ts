import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EREP_INVKARDEX } from '../../shared/modelos/EREP_INVKARDEX';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';

@Component({
  selector: 'app-almacenkardex',
  templateUrl: './almacenkardex.component.html',
  styleUrls: []
})
export class AlmacenkardexComponent implements OnInit {

  eListado: EREP_INVKARDEX[];
  eAlmacenes: Ma_Warehouse[];
  forma: FormGroup;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService
  ) { 
    servicioMaestro.getAlmacenes().then(
      (data: Ma_Warehouse[]) => { this.eAlmacenes = data }
    );

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" +
      (x.getMonth() + 1).toString().padStart(2, '0') + '-' +
      x.getDate().toString().padStart(2, '0');

    this.forma = new FormGroup({
      'txtfec1': new FormControl(fechaReg, Validators.required),
      'txtfec2': new FormControl(fechaReg, Validators.required),
      'cmbalmacenes': new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
  }

  CargarReporte() {
    let almacen: string = this.forma.get('cmbalmacenes').value;
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;

    this.servicioReporte.GetRepAlmacenKardex(almacen, f1, f2).subscribe(
      (data: EREP_INVKARDEX[]) => { this.eListado = data; }
    );                                    
  }

  imprimir() {
    window.print();
  }


}
