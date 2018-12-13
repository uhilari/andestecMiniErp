import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_TipoTransaccion } from '../../shared/modelos/Ma_TipoTransaccion';
import { EREP_INVTRANSAC } from '../../shared/modelos/EREP_INVTRANSAC';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';

@Component({
  selector: 'app-almacentransac',
  templateUrl: './almacentransac.component.html',
  styleUrls: []
})
export class AlmacentransacComponent implements OnInit {

  eListado: EREP_INVTRANSAC[];
  eTipoTransac: Ma_TipoTransaccion[];
  eAlmacenes: Ma_Warehouse[] = [];
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
      'f_cmbAlmacen': new FormControl('', Validators.required),
      'f_txtayo': new FormControl('', Validators.required),
      'f_txtmes': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.CargarCombos();
  }

  CargarCombos() {
    //Almacenes
    this.servicioMaestro.getAlmacenes()
      .subscribe((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
      });
  }

  CargarReporte() {
    let tt: string = this.forma.get('cmbtipotransac').value;
    let almacen: string = this.forma.get('f_cmbAlmacen').value;
    let ayo: number = this.forma.get('f_txtayo').value;
    let mes: number = this.forma.get('f_txtmes').value;
    
    this.servicioReporte.GetRepAlmacenTransacciones(tt, almacen, ayo,mes).subscribe(
      (data: EREP_INVTRANSAC[]) => { this.eListado = data; }
    );
  }

  imprimir() {
    window.print();
  }

}
