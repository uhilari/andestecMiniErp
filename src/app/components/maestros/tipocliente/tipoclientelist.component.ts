import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPECUSTOMER } from '../../shared/modelos/MA_TYPECUSTOMER';

@Component({
  selector: 'app-tipoclientelist',
  templateUrl: './tipoclientelist.component.html',
  styles: []
})
export class TipoclientelistComponent implements OnInit {
  eTipoCliente: MA_TYPECUSTOMER[];
  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.maestroServicio.getTipoClientes().subscribe((resp: MA_TYPECUSTOMER[]) => {
      this.eTipoCliente = resp;
    });
  }

  borrarProyecto(codigo: string) {
    this.maestroServicio.borrarTipoCliente(codigo);
    this.cargarListado();
  }
  ngOnInit() {
  }

}
