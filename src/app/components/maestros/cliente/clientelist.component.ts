import { Component } from '@angular/core';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-clientelist',
  templateUrl: './clientelist.component.html',
  styles: []
})
export class ClientelistComponent {

  eClientes: Ma_Customer[] = [];

  constructor(private maestroServicio: MaestrosService) {
    maestroServicio.getClientes()
      .subscribe((resp: Ma_Customer[]) => {
        this.eClientes = resp;
        console.log(resp);
      });
  }

  borrarCliente(codigo: number) {
    this.maestroServicio.borrarCliente(codigo);
  }

  filtrarClientes(dato: string) {
        console.log(dato);
    this.maestroServicio.getClientesxNombre(dato).subscribe(
      (data: Ma_Customer[]) => { this.eClientes = data }
    );
  }



}
