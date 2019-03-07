import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_TipoTransaccion } from '../../shared/modelos/Ma_TipoTransaccion';
import { EREP_INVTRANSAC } from '../../shared/modelos/EREP_INVTRANSAC';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';
declare var swal: any;

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
  bol_cargando: boolean;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService
  ) {
    servicioMaestro.getTipoTransacciones().subscribe(
      (data: Ma_TipoTransaccion[]) => { this.eTipoTransac = data }
    );

    //iniciamos el formulario
    let x: Date = new Date();

    this.forma = new FormGroup({
      'cmbtipotransac': new FormControl(''),
      'f_cmbAlmacen': new FormControl('', Validators.required),
      'f_txtayo': new FormControl(x.getFullYear(), Validators.required),
      'f_txtmes': new FormControl(x.getMonth() + 1, Validators.required),
      'f_chkTodos': new FormControl('true')
    });
  }

  ngOnInit() {
    this.CargarCombos();
  }

  CargarCombos() {
    //Almacenes
    this.servicioMaestro.getAlmacenes()
      .then((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
      });
  }

  CargarReporte() {

    if (!this.forma.get('f_chkTodos').value) {
      if (!this.forma.get('cmbtipotransac').value) {
        swal("Seleccione una transaccion para continuar", { icon: "warning" });
        return;
      }
    }

    if (!this.forma.get('f_cmbAlmacen').value) {
      swal("Seleccione un almacen para continuar", { icon: "warning" });
      return;
    }

    let tt: string = this.forma.get('cmbtipotransac').value;
    let almacen: string = this.forma.get('f_cmbAlmacen').value;
    let ayo: number = this.forma.get('f_txtayo').value;
    let mes: number = this.forma.get('f_txtmes').value;

    if (this.forma.get('f_chkTodos').value) {
      tt = "000";
    }
    this.bol_cargando = true;
    this.servicioReporte.GetRepAlmacenTransacciones(tt, almacen, ayo, mes)
      .then(
        (data: EREP_INVTRANSAC[]) => { this.bol_cargando = false; this.eListado = data; }
      ).catch(err => { this.bol_cargando = false; swal('Ocurrio un error', err, 'error') });
  }

  imprimir() {
    window.print();
  }

}
