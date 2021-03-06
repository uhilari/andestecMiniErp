import { Component } from '@angular/core';
import { Ma_Lot } from '../../shared/modelos/Ma_Lot';
import { MaestrosService } from '../../../services/maestros.service';
declare var swal: any;

@Component({
  selector: 'app-lotelist',
  templateUrl: './lotelist.component.html',
  styleUrls: []
})
export class LotelistComponent {
  eLote: Ma_Lot[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.bol_cargando = true;
    this.cargarData();
  };

  cargarData() {
    this.maestroServicio.getLotes()
      .then((resp: Ma_Lot[]) => { this.eLote = resp; this.bol_cargando = false; })
      .catch(err => { this.ShowError(err) });
  }

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  borrarLote(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarLote(id).then(
            res => {
              swal("Registro Eliminado", { icon: "success", });
              this.cargarData()
            }
          ).catch(err => this.ShowError(err));
        }
      });
  }

}
