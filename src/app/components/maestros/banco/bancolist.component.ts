import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { EMA_BANK } from '../../shared/modelos/EMA_BANK';
declare var swal: any;

@Component({
  selector: 'app-bancolist',
  templateUrl: './bancolist.component.html',
  styles: []
})
export class BancolistComponent implements OnInit {

  eBanco: EMA_BANK[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private _ms: MaestrosService) {
    this.cargarBancos();
  };

  cargarBancos() {
    this.bol_cargando = true;
    this._ms.getBancos()
      .then((resp: EMA_BANK[]) => {
        this.eBanco = resp;
        this.bol_cargando = false;
      });
  }

  borrarBanco(id: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._ms.borrarBanco(id).then(
            res => {
              if (res == "ok") {
                this.cargarBancos();
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
