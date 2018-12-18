import { Component } from '@angular/core';
import { ERE_LISTADOPEDIDO } from '../../shared/modelos/ERE_LISTADOPEDIDO';
import { VentasService } from '../../../services/ventas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ordpedidolist',
  templateUrl: './ordpedidolist.component.html',
  styleUrls: []
})
export class OrdpedidolistComponent {

  ePedidos: ERE_LISTADOPEDIDO[] = [];
  forma: FormGroup;
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private vservicio: VentasService) {
    this.forma = new FormGroup({
      'f_txtTextoBuscar': new FormControl()
    });
  }

  cargarPedidos() {
    this.bol_cargando = true;  
    this.vservicio.getPedidos().then(
      (dat: ERE_LISTADOPEDIDO[]) => { this.ePedidos = dat; this.bol_cargando = false; }
    ).catch(err => this.ShowError(err));
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
