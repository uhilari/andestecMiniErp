import { Component, OnInit } from '@angular/core';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransaccionesService } from '../../../services/transacciones.service';
import { Re_Lista01 } from '../../shared/modelos/Re_Lista01';

@Component({
  selector: 'app-docalmacen',
  templateUrl: './docalmacen.component.html',
  styleUrls: []
})
export class DocalmacenComponent implements OnInit {
  forma: FormGroup;
  eAlmacenes: Ma_Warehouse[] = [];
  eListado01: Re_Lista01[];

  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private mservicio: MaestrosService, private tservicio: TransaccionesService) {

    //cargamos la entidad para los combos
    this.CargarCombos();

    //iniciamos el formulario
    this.forma = new FormGroup({
      'f_cmbAlmacen': new FormControl('001'),
      'f_txtayo': new FormControl(new Date().getFullYear()),
      'f_txtmes': new FormControl(new Date().getMonth()),
      'f_txtTextoBuscar': new FormControl()
    });

  }

  ngOnInit() {
  }

  CargarCombos() {
    //Almacenes
    this.mservicio.getAlmacenes()
      .then((resp: Ma_Warehouse[]) => this.eAlmacenes = resp)
      .catch(err => { this.ShowError(err) });
  }

  CargarListado() {
    let idalmacen = this.forma.get('f_cmbAlmacen').value;
    let ayo = this.forma.get('f_txtayo').value;
    let mes = this.forma.get('f_txtmes').value;
    let texto = this.forma.get('f_txtTextoBuscar').value;

    this.eListado01 = [];
    this.bol_cargando = true;
    this.tservicio.getRepListado01(idalmacen, ayo, mes)
      .then((resp: Re_Lista01[]) => { this.eListado01 = resp; this.bol_cargando = false; })
      .catch(err => { this.ShowError(err) });
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
