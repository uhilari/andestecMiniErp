import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family } from '../../shared/modelos/MA_FAMILY';
declare var swal: any;

@Component({
  selector: 'app-familialist',
  templateUrl: './familialist.component.html',
  styles: []
})
export class FamilialistComponent {

  eFamilia: Ma_Family[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarFamilias();
  }

  cargarFamilias() {
    this.bol_cargando = true;
    this.maestroServicio.getFamilias()
      .then((resp: Ma_Family[]) => {
        this.eFamilia = resp;
        this.bol_cargando = false;
      }).catch(err => { this.ShowError(err) });
  }

  borrarFamilia(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          if (confirm("Seguro de eliminar?")) {
            this.maestroServicio.borrarFamilia(id).then(
              res => {
                if (res == "ok") {
                  swal("Registro Eliminado", { icon: "success", });
                  this.cargarFamilias();
                }
              }
            ).catch(err => { this.ShowError(err) });
          }
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

}
