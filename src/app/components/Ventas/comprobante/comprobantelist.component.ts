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
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private vservicio: VentasService) {
    this.forma = new FormGroup({
      'f_txtTextoBuscar': new FormControl('')
    });
  }

  cargarComprobantes() {
    this.bol_cargando = true;
    this.vservicio.getComprobantes().then(
      (dat: ERE_LISTADOCOMPROBANTE[]) => { this.eComprobantes = dat;this.bol_cargando = false; }
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
