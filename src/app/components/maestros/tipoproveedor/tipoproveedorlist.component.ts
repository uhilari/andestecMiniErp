import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPEPROVIDER } from '../../shared/modelos/MA_TYPEPROVIDER';
declare var swal: any;

@Component({
  selector: 'app-tipoproveedorlist',
  templateUrl: './tipoproveedorlist.component.html',
  styles: []
})
export class TipoproveedorlistComponent implements OnInit {
  eTipoProveedor: MA_TYPEPROVIDER[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarTipoProve();
  }

  cargarTipoProve() {
    this.bol_cargando = true;
    this.maestroServicio.getTipoProveedores()
      .then((resp: MA_TYPEPROVIDER[]) => {
        this.eTipoProveedor = resp;
        this.bol_cargando = false;
      }).catch(err => this.ShowError(err));
  }

  borrarTipoProveedor(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarTipoProveedor(id).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarTipoProve();
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
