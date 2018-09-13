import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';

@Component({
  selector: 'app-vendedorlist',
  templateUrl: './vendedorlist.component.html',
  styleUrls: []
})
export class VendedorlistComponent {
  eVendedores: EMA_SELLER[];
  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado(){
    this.maestroServicio.getVendedores()
    .subscribe((resp: EMA_SELLER[]) => {
      this.eVendedores = resp;
      console.log(resp);
    });
  }

  borrarUnidad(codigo: string) {
    this.maestroServicio.borrarVendedor(codigo);
    this.cargarListado();
  }

}
