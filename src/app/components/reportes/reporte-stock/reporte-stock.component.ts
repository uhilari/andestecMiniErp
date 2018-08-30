import { Component } from '@angular/core';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransaccionesService } from '../../../services/transacciones.service';
import { Re_Lista02 } from '../../shared/modelos/Re_Lista02';
import { Re_Lista03 } from '../../shared/modelos/Re_Lista03';

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
      .subscribe((resp: Ma_Warehouse[]) => {
        this.eAlmacenes = resp;
      });

    console.log(this.eAlmacenes);
  }

  CargarData() {
    let idalmacen = this.forma.get('f_cmbAlmacen').value;
    //let texto = this.forma.get('f_txtTextoBuscar').value;

    this.transervicio.getRepListado02(idalmacen).subscribe((resp: Re_Lista02[]) => {
      this.eListado02 = resp;
    });
  }

  VerDetStock(idarticulo: number) {
    //let idalmacen = this.forma.get('f_cmbAlmacen').value;
    this.transervicio.getRepListado03(idarticulo).subscribe((resp: Re_Lista03[]) => {
      this.eListado03 = resp;
      console.log('data detalle:', resp);

    });

  }


}
