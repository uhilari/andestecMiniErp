import { Component } from '@angular/core';
import { Ma_Provider } from '../../shared/modelos/Ma_Provider';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-proveedorlist',
  templateUrl: './proveedorlist.component.html',
  styles: []
})
export class ProveedorlistComponent {

  eProveedores: Ma_Provider[];

  constructor(private maestroServicio: MaestrosService) {
    this.eProveedores = maestroServicio.getProveedores();
    console.log(this.eProveedores);
  }

  borrarProveedor(codigo: string) {
    console.log("borrando codigo:", codigo);

  }

}
