import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Family_Sub } from '../../shared/modelos/Ma_Family_Sub';
declare var swal: any;

@Component({
  selector: 'app-familiasublist',
  templateUrl: './familiasublist.component.html',
  styles: []
})

export class FamiliasublistComponent {
  eFamiliaSub: Ma_Family_Sub[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarSubFamilias();
  }

  cargarSubFamilias() {
    this.bol_cargando = true;
    this.maestroServicio.getFamiliasSub()
      .then((resp: Ma_Family_Sub[]) => {
        this.eFamiliaSub = resp;
        this.bol_cargando = false;
      }).catch(error => this.ShowError(error));
  }

  borrarSubFamilia(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarSubFamilia(id).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarSubFamilias();
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

}
