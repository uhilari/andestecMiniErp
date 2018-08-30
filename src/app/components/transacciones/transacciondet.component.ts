import { Component } from '@angular/core';
import { tra_DetalleIA } from '../shared/modelos/Tra_DetalleIA';
import { TransaccionesService } from '../../services/transacciones.service';

@Component({
  selector: 'app-transacciondet',
  templateUrl: './transacciondet.component.html',
  styles: []
})
export class TransacciondetComponent {

  eDetallesIA: tra_DetalleIA[];
  bol_nuevod: boolean = false;

  constructor(private traServicio: TransaccionesService) {
    this.eDetallesIA = traServicio.getDetallesIA();
  }


  cargarDatos() {
    this.traServicio.agregarDetallesPrueba();
  }

  eliminarItem(itemb: number) {
    console.log("item a borrar es:", itemb);
    this.traServicio.DeleteItemDetallesIA(itemb);
    this.eDetallesIA = this.traServicio.getDetallesIA();
  }


  

}
