import { Component, OnInit } from '@angular/core';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-clientelist',
  templateUrl: './clientelist.component.html',
  styles: []
})
export class ClientelistComponent {

  eClientes: Ma_Customer[];

  constructor(private maestroServicio: MaestrosService) {
    this.eClientes = maestroServicio.getClientes();
    console.log(this.eClientes);    
  }

  borrarCliente(codigo: number) {
    console.log("Borrando cliente: ", codigo);
  }
}
