import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ERE_VISTAPEDIDO } from '../../shared/modelos/ERE_VISTAPEDIDO';
import { VentasService } from '../../../services/ventas.service';
import { ERE_VISTACOMPROBANTE } from '../../shared/modelos/ERE_VISTACOMPROBANTE';

@Component({
  selector: 'app-vistacomprobante',
  templateUrl: './vistacomprobante.component.html',
  styleUrls: []
})
export class VistacomprobanteComponent  {
  id: number = 0;
  eComprobante: ERE_VISTACOMPROBANTE = {
    Cabecera: {},
    Detalle: []
  };
  constructor(
    private transServicio: VentasService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

    route.params.subscribe(parametros => this.id = parametros['id'])
  
    //cabecera
    transServicio.getRepVistaComprobante (this.id).subscribe(
      (data: ERE_VISTACOMPROBANTE) => {        
        this.eComprobante = data;        
      }, err => console.log(err)
    );
  }

  //funcion imprimir
  imprimir() { window.print() }
  

  

}
