import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_TRANSCOLLECTION } from '../../shared/modelos/ECA_TRANSCOLLECTION';

declare var swal: any;

@Component({
  selector: 'app-tipotranscajalist',
  templateUrl: './tipotranscajalist.component.html',
  styles: []
})
export class TipotranscajalistComponent implements OnInit {

  eTipos: ECA_TRANSCOLLECTION[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private _ms: MaestrosService) {
    this.cargaTipoTransac();
  }

  cargaTipoTransac() {
    this.bol_cargando = true;
    this._ms.getTipoTransaccionesCaja()
      .then((resp: ECA_TRANSCOLLECTION[]) => {
        this.eTipos = resp;
        this.bol_cargando = false;
      });
  }

  borrarTipoTransCaja(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._ms.borrarTipoTransaccionCaja(id).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargaTipoTransac();
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
