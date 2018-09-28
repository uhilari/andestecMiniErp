import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EREP_SELVTAXARTI } from '../../shared/modelos/EREP_SELVTAXARTI';
import { Ma_Article } from '../../shared/modelos/Ma_Article';

@Component({
  selector: 'app-ventasarticulo',
  templateUrl: './ventasarticulo.component.html',
  styleUrls: []
})
export class VentasarticuloComponent implements OnInit {

  eListado: EREP_SELVTAXARTI[];
  eArticulos: Ma_Article[];
  forma: FormGroup;

  constructor(
    private servicioReporte: ReportesService,
    private servicioMaestro: MaestrosService
  ) { 
    servicioMaestro.getArticulos().subscribe(
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
    })

  }

  ngOnInit() {
  }

  CargarReporte() {
    let articulo: string = this.forma.get('cmbarticulo').value;
    let f1: string = this.forma.get('txtfec1').value;
    let f2: string = this.forma.get('txtfec2').value;

    this.servicioReporte.GetRepVentasxArticulo(articulo, f1, f2).subscribe(
      (data: EREP_SELVTAXARTI[]) => { this.eListado = data; }
    );                                    
  }

  imprimir() {
    window.print();
  }

}
