import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Article } from '../../shared/modelos/Ma_Article';

@Component({
  selector: 'app-articulolist',
  templateUrl: './articulolist.component.html',
  styles: []
})
export class ArticulolistComponent {
  eArticulo: Ma_Article[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getArticulos()
      .then((resp: Ma_Article[]) => { this.eArticulo = resp; this.bol_cargando = false; })
      .catch(err => { this.ShowError(err) });
  }

  borrarArticulo(codigo: number) {
    if (confirm("Seguro de eliminar?")) {
      this.maestroServicio.borrarArticulo(codigo).then(
        res => {
          if (res == "ok") { this.cargarListado() }
        }
      ).catch(err => this.ShowError(err));
    }
  }

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  filtrar(dato: string) {
    this.maestroServicio.getArticuloxNombre(dato).then(
      (data: Ma_Article[]) => { this.eArticulo = data }
    );
  }
}
