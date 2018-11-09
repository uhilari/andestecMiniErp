import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VentasService } from '../../../services/ventas.service';
import { ERE_LISTADOCOMPROBANTE } from '../../shared/modelos/ERE_LISTADOCOMPROBANTE';

@Component({
  selector: 'app-comprobantelist',
  templateUrl: './comprobantelist.component.html',
  styleUrls: []
})

export class ComprobantelistComponent {
  eComprobantes: ERE_LISTADOCOMPROBANTE[];
  forma: FormGroup;
  constructor(private vservicio: VentasService) {
    this.forma = new FormGroup({
      'f_txtTextoBuscar': new FormControl('')
    });
  }

  cargarComprobantes() {
    this.vservicio.getComprobantes().subscribe(
      (dat: ERE_LISTADOCOMPROBANTE[]) => { this.eComprobantes = dat }
    );
  }

}
