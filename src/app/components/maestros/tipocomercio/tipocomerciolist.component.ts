import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPECOMMERCE } from '../../shared/modelos/MA_TYPECOMMERCE';
declare var swal: any;

@Component({
  selector: 'app-tipocomerciolist',
  templateUrl: './tipocomerciolist.component.html',
  styles: []
})
export class TipocomerciolistComponent implements OnInit {
  eTipocomercio: MA_TYPECOMMERCE[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado()
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getTipoComercios().then((resp: MA_TYPECOMMERCE[]) => {
      this.eTipocomercio = resp;
      this.bol_cargando = false;
    });
  }

  borrarTipoComercio(codigo: string) {

    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarTipoComercio(codigo).then(
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

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  ngOnInit() {
  }

}
