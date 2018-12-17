import { Component } from '@angular/core';
import { Ma_Lot } from '../../shared/modelos/Ma_Lot';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-lotelist',
  templateUrl: './lotelist.component.html',
  styleUrls: []
})
export class LotelistComponent {
  eLote: Ma_Lot[];
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
    if (confirm("Seguro de eliminar?")) {
      this.maestroServicio.borrarLote(id).then(
        res => this.cargarData()
      ).catch(err => this.ShowError(err));
    }
  }


}
