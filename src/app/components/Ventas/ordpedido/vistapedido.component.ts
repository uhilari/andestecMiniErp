import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ERE_VISTAPEDIDO } from '../../shared/modelos/ERE_VISTAPEDIDO';
import { VentasService } from '../../../services/ventas.service';


@Component({
  selector: 'app-vistapedido',
  templateUrl: './vistapedido.component.html',
  styleUrls: []
})
export class VistapedidoComponent {

  id: number = 0;
  ePedido: ERE_VISTAPEDIDO = {
    Cabecera: {},
    Detalle: []
  };
  

  constructor(
    private transServicio: VentasService,
    private router: Router,
    private route: ActivatedRoute) {

    route.params.subscribe(parametros => this.id = parametros['id'])
  
    //cabecera
    transServicio.getRepVistaPedido (this.id).subscribe(
      (data: ERE_VISTAPEDIDO) => {        
        this.ePedido = data;
      }, err => console.log(err)
    );
  }

  //funcion imprimir
  imprimir() { window.print() }


}
