import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPECUSTOMER } from '../../shared/modelos/MA_TYPECUSTOMER';

declare var swal: any;

@Component({
  selector: 'app-tipoclientelist',
  templateUrl: './tipoclientelist.component.html',
  styles: []
})

export class TipoclientelistComponent implements OnInit {
  eTipoCliente: MA_TYPECUSTOMER[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getTipoClientes().then((
      resp: MA_TYPECUSTOMER[]) => {
      this.eTipoCliente = resp;
      this.bol_cargando = false;
    });
  }

  borrarProyecto(codigo: string) {

    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarTipoCliente(codigo).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarListado();
              }
            }
          ).catch(err => this.ShowError(err));
        }
      });
  }

  ngOnInit() {
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
