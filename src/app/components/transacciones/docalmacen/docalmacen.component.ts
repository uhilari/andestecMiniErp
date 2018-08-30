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

  constructor(private mservicio: MaestrosService, private tservicio: TransaccionesService) {

    //cargamos la entidad para los combos
    this.CargarCombos();

    //iniciamos el formulario
    this.forma = new FormGroup({
      'f_cmbAlmacen': new FormControl('001'),
      'f_txtTextoBuscar': new FormControl()
    });

  }

  ngOnInit() {
  }

  CargarCombos() {
    //Almacenes
    this.mservicio.getAlmacenes()
      .subscribe((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
      });
  }

  CargarListado() {
    let idalmacen = this.forma.get('f_cmbAlmacen').value;
    let texto = this.forma.get('f_txtTextoBuscar').value;

    this.tservicio.getRepListado01().subscribe((resp: Re_Lista01[]) => {
      this.eListado01 = resp;
    });

  }



}
