import { Component } from '@angular/core';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransaccionesService } from '../../../services/transacciones.service';
import { Re_Lista02 } from '../../shared/modelos/Re_Lista02';
import { Re_Lista03 } from '../../shared/modelos/Re_Lista03';
declare var swal: any;

@Component({
  selector: 'app-reporte-stock',
  templateUrl: './reporte-stock.component.html',
  styleUrls: []
})
export class ReporteStockComponent {
  forma: FormGroup;
  eAlmacenes: Ma_Warehouse[] = [];
  eListado02: Re_Lista02[] = [];
  eListado03: Re_Lista03[] = [];
  bol_cargando: boolean;

  constructor(
    private maestroservicio: MaestrosService,
    private transervicio: TransaccionesService
  ) {

    this.forma = new FormGroup({
      'f_cmbAlmacen': new FormControl('001'),
      'f_txtTextoBuscar': new FormControl()
    });

    //Almacenes
    this.maestroservicio.getAlmacenes()
      .then((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
      });

    console.log(this.eAlmacenes);
  }

  CargarData() {

    if (!this.forma.get('f_cmbAlmacen').value) {
      swal("Seleccione un almacen para continuar", { icon: "warning" });
      return;
    }

    let idalmacen = this.forma.get('f_cmbAlmacen').value;
    //let texto = this.forma.get('f_txtTextoBuscar').value;

    this.bol_cargando = true;
    this.transervicio.getRepListado02(idalmacen)
      .then((resp: Re_Lista02[]) => {
        this.bol_cargando = false;
        this.eListado02 = resp;
      }).catch(err => { this.bol_cargando = false; swal('Ocurrio un error', err, 'error') });
  }

  VerDetStock(idarticulo: number) {
    this.bol_cargando = true;
    this.transervicio.getRepListado03(idarticulo)
    .then((resp: Re_Lista03[]) => {
      this.bol_cargando = false;
      this.eListado03 = resp;
      console.log(resp);      
    }).catch(err => { this.bol_cargando = false; swal('Ocurrio un error', err, 'error') });

  }


}
