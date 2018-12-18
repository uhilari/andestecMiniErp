import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_DOCUMENTS } from '../../shared/modelos/MA_DOCUMENTS';

@Component({
  selector: 'app-documentoslist',
  templateUrl: './documentoslist.component.html',
  styleUrls: []
})
export class DocumentoslistComponent {

  eDocumentos: MA_DOCUMENTS[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;


  constructor(private maestroServicio: MaestrosService) {
    this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.bol_cargando = true;
    this.maestroServicio.getDocumentos()
      .then((resp: MA_DOCUMENTS[]) => {
        this.eDocumentos = resp;
        this.bol_cargando = false;
      });
  }

  borrarDocumento(id: string) {
    if (confirm("¿Deseas eliminar este registro?")) {
      this.maestroServicio.borrarDocumento(id).then(
        res => {
          if (res == "ok") {
            this.cargarDocumentos();
          }
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

}
