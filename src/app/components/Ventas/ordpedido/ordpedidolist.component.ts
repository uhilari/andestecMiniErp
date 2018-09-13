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

  ePedidos: ERE_LISTADOPEDIDO[];
  forma: FormGroup;

  constructor(private vservicio: VentasService) {     
    this.forma = new FormGroup({      
      'f_txtTextoBuscar': new FormControl()
    });
  }

  cargarPedidos() {
    this.vservicio.getPedidos().subscribe(
      (dat: ERE_LISTADOPEDIDO[]) => { this.ePedidos = dat }
    );
  }

}
