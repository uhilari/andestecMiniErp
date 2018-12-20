import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_BANKACCOUNT } from '../../shared/modelos/ECA_BANKACCOUNT';
declare var swal: any;

@Component({
  selector: 'app-ctabancarialist',
  templateUrl: './ctabancarialist.component.html',
  styles: []
})
export class CtabancarialistComponent implements OnInit {

  eCtacte: ECA_BANKACCOUNT[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private _ms: MaestrosService) {
    this.cargarCuentasBancarias();
  }

  cargarCuentasBancarias() {
    this.bol_cargando = true;
    this._ms.getCuentaBancarias()
      .then((resp: ECA_BANKACCOUNT[]) => {
        this.eCtacte = resp;
        this.bol_cargando = false;
      });
  }

  borrarCtacte(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          this._ms.borrarCuentaBancaria(id).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarCuentasBancarias();
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
