import { Component } from '@angular/core';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { MaestrosService } from '../../../services/maestros.service';
declare var swal: any;

@Component({
  selector: 'app-clientelist',
  templateUrl: './clientelist.component.html',
  styles: []
})
export class ClientelistComponent {

  eClientes: Ma_Customer[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarClientes();
  }

  cargarClientes() {
    this.bol_cargando = true;
    this.maestroServicio.getClientes()
      .then((resp: Ma_Customer[]) => { this.eClientes = resp; this.bol_cargando = false; })
      .catch(err => { this.ShowError(err) });
  }

  borrarCliente(codigo: number) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarCliente(codigo).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarClientes()
              }
            }
          ).catch(err => this.ShowError(err));
        }
      });
  }

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  filtrarClientes(dato: string) {
    this.bol_cargando = true;
    this.maestroServicio.getClientesxNombre(dato).then(
      (data: Ma_Customer[]) => { this.eClientes = data; this.bol_cargando = false; }
    ).catch(err => { this.ShowError(err) });
  }



}
