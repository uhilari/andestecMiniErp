import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { Seg_Usuario } from '../../shared/modelos/SEG_Usuario';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
declare var swal: any;

@Component({
  selector: 'app-usuariolist',
  templateUrl: './usuariolist.component.html'
})
export class UsuariolistComponent implements OnInit {
  eUsuarios: Seg_Usuario[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;

  constructor(private seguridadService: SeguridadService) {
    this.cargarListado();
  }

  ngOnInit() {
  }

  cargarListado() {
    this.eUsuarios = [];
    this.bol_cargando = true;
    this.seguridadService.getUsuarios()
      .subscribe(resp => {
        this.eUsuarios = resp;
        this.bol_cargando = false;
      }, err => { this.ShowError(err) });
  }

  borrarUsuario(id: string) {

    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.seguridadService.borrarUsuario(id)
            .subscribe(res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarListado()
              }
            }, err => this.ShowError(err));
        }
      });
  }

  verPerfil(usr: Seg_Usuario) {
    return usr.esAdmin ? "Administrador" : "Usuario";
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
