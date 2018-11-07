import { Component } from '@angular/core';
import { Ma_Provider } from '../../shared/modelos/Ma_Provider';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-proveedorlist',
  templateUrl: './proveedorlist.component.html',
  styles: []
})
export class ProveedorlistComponent {

  eProveedores: Ma_Provider[] = [];

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.eProveedores = [];
    this.maestroServicio.getProveedores()
      .subscribe((resp: Ma_Provider[]) => {
        this.eProveedores = resp;
        console.log(resp);
      });
  }

  borrarProveedor(codigo: string) {
    this.maestroServicio.borrarProveedor(parseInt(codigo));
    this.cargarListado();
  }

  filtrar(dato: string) {      
    this.maestroServicio.getBuscaProveedores(dato).subscribe(
      (data: Ma_Provider[]) => { this.eProveedores = data }
    );
  }

}
