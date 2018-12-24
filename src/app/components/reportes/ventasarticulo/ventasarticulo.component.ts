import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EREP_SELVTAXARTI } from '../../shared/modelos/EREP_SELVTAXARTI';
import { Ma_Article } from '../../shared/modelos/Ma_Article';
declare var swal: any;

@Component({
  selector: 'app-ventasarticulo',
  templateUrl: './ventasarticulo.component.html',
  styleUrls: []
})
export class VentasarticuloComponent implements OnInit {

  eListado: EREP_SELVTAXARTI[];
  eArticulos: Ma_Article[];
  forma: FormGroup;
  bol_cargando: boolean;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService
  ) {
    this.servicioMaestro.getArticulos().then(
      (data: Ma_Article[]) => { this.eArticulos = data }
    );

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" +
      (x.getMonth() + 1).toString().padStart(2, '0') + '-' +
      x.getDate().toString().padStart(2, '0');

    this.forma = new FormGroup({
      'txtfec1': new FormControl(fechaReg, Validators.required),
      'txtfec2': new FormControl(fechaReg, Validators.required),
      'cmbarticulo': new FormControl('', Validators.required),
      'f_chkTodos': new FormControl('')
    })

  }

  ngOnInit() {
  }

  CargarReporte() {

    if (!this.forma.get('f_chkTodos').value) {
      if (!this.forma.get('cmbarticulo').value) {
        swal("Seleccione un articulo para continuar", { icon: "warning" });
        return;
      }
    }

    let articulo: string = this.forma.get('cmbarticulo').value;
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;

    if (this.forma.get('f_chkTodos').value) {
      articulo = "0";
    }

    this.bol_cargando = true;
    this.servicioReporte.GetRepVentasxArticulo(articulo, f1, f2).then(
      (data: EREP_SELVTAXARTI[]) => { this.eListado = data; this.bol_cargando = false }
    );
  }

  imprimir() {
    window.print();
  }

}
