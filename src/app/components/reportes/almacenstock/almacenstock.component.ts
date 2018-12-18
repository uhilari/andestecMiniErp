import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';
import { EREP_INVSTOCK } from '../../shared/modelos/EREP_INVSTOCK';


@Component({
  selector: 'app-almacenstock',
  templateUrl: './almacenstock.component.html',
  styleUrls: []
})
export class AlmacenstockComponent implements OnInit {
  eListado: EREP_INVSTOCK[];
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
      'cmbalmacenes': new FormControl('', Validators.required),
    })

  }

  ngOnInit() {
  }

  CargarReporte() {
    let almacen: string = this.forma.get('cmbalmacenes').value;    

    this.servicioReporte.GetRepAlmacenStock(almacen).subscribe(
      (data: EREP_INVSTOCK[]) => { this.eListado = data; }
    );                                    
  }

  imprimir() {
    window.print();
  }

}
