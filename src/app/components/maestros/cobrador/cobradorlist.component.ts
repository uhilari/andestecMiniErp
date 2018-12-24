import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_COLLECTOR } from '../../shared/modelos/ECA_COLLECTOR';
declare var swal: any;

@Component({
  selector: 'app-cobradorlist',
  templateUrl: './cobradorlist.component.html',
  styles: []
})
export class CobradorlistComponent implements OnInit {
  eCobrador: ECA_COLLECTOR[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private _ms: MaestrosService) {
    this.cargarCobradores();
  }

  cargarCobradores() {
    this._ms.getCobradores()
      .then((resp: ECA_COLLECTOR[]) => {
        this.eCobrador = resp; this.bol_cargando = false;
      }).catch(err => { this.ShowError(err) });
  }

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  borrarCobrador(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._ms.borrarCobrador(id).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarCobradores()
              }
            }
          ).catch(err => this.ShowError(err));
        }
      });
  }

  ngOnInit() {
  }

}
