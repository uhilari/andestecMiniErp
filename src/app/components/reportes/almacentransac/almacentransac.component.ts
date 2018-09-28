import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_TipoTransaccion } from '../../shared/modelos/Ma_TipoTransaccion';
import { EREP_INVTRANSAC } from '../../shared/modelos/EREP_INVTRANSAC';

@Component({
  selector: 'app-almacentransac',
  templateUrl: './almacentransac.component.html',
  styleUrls: []
})
export class AlmacentransacComponent implements OnInit {

  eListado: EREP_INVTRANSAC[];
  eTipoTransac: Ma_TipoTransaccion[];
  forma: FormGroup;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService
  ) { 
    servicioMaestro.getTipoTransacciones().subscribe(
      (data: Ma_TipoTransaccion[]) => { this.eTipoTransac = data }
    );

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" +
      (x.getMonth() + 1).toString().padStart(2, '0') + '-' +
      x.getDate().toString().padStart(2, '0');

    this.forma = new FormGroup({      
      'cmbtipotransac': new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
  }

  CargarReporte() {
    let almacen: string = this.forma.get('cmbtipotransac').value;    

    this.servicioReporte.GetRepAlmacenTransacciones(almacen).subscribe(
      (data: EREP_INVTRANSAC[]) => { this.eListado = data; }
    );                                    
  }

  imprimir() {
    window.print();
  }

}
