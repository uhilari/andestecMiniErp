import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPEPRICE } from '../../shared/modelos/MA_TYPEPRICE';
declare var swal: any;

@Component({
  selector: 'app-tipopreciolist',
  templateUrl: './tipopreciolist.component.html',
  styles: []
})
export class TipopreciolistComponent implements OnInit {
  eTipoprecio: MA_TYPEPRICE[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) { this.cargarListado() }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getTipoPrecios().then(
      (resp: MA_TYPEPRICE[]) => {
        this.eTipoprecio = resp;
        this.bol_cargando = false;
      });
  }

  borrarTipoPrecio(codigo: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarTipoPrecio(codigo).then(
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
