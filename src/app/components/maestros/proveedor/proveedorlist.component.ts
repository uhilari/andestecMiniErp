import { Component } from '@angular/core';
import { Ma_Provider } from '../../shared/modelos/Ma_Provider';
import { MaestrosService } from '../../../services/maestros.service';
declare var swal: any;

@Component({
  selector: 'app-proveedorlist',
  templateUrl: './proveedorlist.component.html',
  styles: []
})
export class ProveedorlistComponent {

  eProveedores: Ma_Provider[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.eProveedores = []; this.bol_cargando = true;
    this.maestroServicio.getProveedores()
      .then((resp: Ma_Provider[]) => { this.eProveedores = resp; this.bol_cargando = false }).catch(err => this.ShowError(err));
  }

  borrarProveedor(codigo: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarProveedor(parseInt(codigo)).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarListado()
              }
            }
          ).catch(err => this.ShowError(err));
        }
      });
  }

  filtrar(dato: string) {
    this.eProveedores = []; this.bol_cargando = true;
    this.maestroServicio.getBuscaProveedores(dato).then(
      (data: Ma_Provider[]) => { this.eProveedores = data; this.bol_cargando = false; }
    );
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
