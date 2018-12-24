import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Service } from '../../shared/modelos/Ma_Service';
declare var swal: any;

@Component({
  selector: 'app-serviciolist',
  templateUrl: './serviciolist.component.html',
  styles: []
})
export class ServiciolistComponent {
  eServicio: Ma_Service[] = [];
  bol_cargando: boolean;

  constructor(private maestroServicio: MaestrosService) {
    this.cargarListado();
  }

  cargarListado() {
    this.bol_cargando = true;
    this.maestroServicio.getServicios()
      .then((resp: Ma_Service[]) => {
        this.bol_cargando = false;
        this.eServicio = resp;
      });
  }

  borrarServicio(codigo: string) {
    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.maestroServicio.borrarServicio(codigo).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarListado();
              }
            }
          );
          this.cargarListado();
        }
      });

  }
}
