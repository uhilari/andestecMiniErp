import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/services/maestros.service';
import { EMA_USERSALESPOINT } from '../../shared/modelos/EMA_USERSALESPOINT';
import { AppGlobals } from '../../shared/modelos/app.global';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MA_SALESPOINT } from '../../shared/modelos/MA_SALESPOINT';
declare var swal: any;

@Component({
  selector: 'app-ptovtausuario',
  templateUrl: './ptovtausuario.component.html',
  styles: []
})
export class PtovtausuarioComponent implements OnInit {

  forma: FormGroup;
  listaPuntos: EMA_USERSALESPOINT[] = [];
  puntosVenta: MA_SALESPOINT[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;
  msj_ok: string;
  bol_msj: boolean;

  usuarios: any = [
    {
      correo: 'cbazan@gmail.com'
    },
    {
      correo: 'max.valdivia@altavista.com'
    },
    {
      correo: 'p.bonilla@gmail.com'
    },
    {
      correo: 'ventas1@ferreteria.com.pe'
    },
    {
      correo: 'admin@empresa1.com'
    }
  ]

  constructor(
    private _sm: MaestrosService,
    private _appg: AppGlobals
  ) {
    this.cargarPuntosdeVentas();
    this.cargarPuntosvtaxUsuarios();
  }

  ngOnInit() {
    this.forma = new FormGroup({
      'US_IDUSER': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'US_IDSALESPOINT': new FormControl('', [Validators.required, Validators.maxLength(3)]),
      'US_IDCOMPANY': new FormControl('1', Validators.required),
    });
  }

  cargarPuntosdeVentas() {
    this._sm.getPuntoVentas().then(
      (res: MA_SALESPOINT[]) => {
        this.puntosVenta = res;
      }
    ).catch(err => {
      console.log('Error: ', err);
      this.bol_cargando = false;
    });
  }

  cargarPuntosvtaxUsuarios() {
    this.bol_cargando = true;
    this._sm.getPtoVtaxUsuario().then(
      (res: EMA_USERSALESPOINT[]) => {
        this.listaPuntos = res;
        this.bol_cargando = false;
      }
    ).catch(err => {
      console.log('Error: ', err);
      this.bol_cargando = false;
    });
  }

  borrarPtoVta(idusu: string, idpto: string) {

    swal({
      title: "Esta seguro de eliminar?",
      text: "Una vez eliminado, no podra recuperar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._sm.borrarPtoVtaxUsuario(idusu, idpto).then(
            res => {
              if (res == "ok") {
                swal("Registro Eliminado", { icon: "success", });
                this.cargarPuntosvtaxUsuarios();
              }
            }
          ).catch(err => this.ShowError(err));
        }
      });


  }

  guardarCambios() {

    let ptovta: string = this.forma.get('US_IDSALESPOINT').value;
    let usuario: string = this.forma.get('US_IDUSER').value;
    let bol_existe: boolean = false;

    this.listaPuntos.forEach(element => {
      if (element.US_IDUSER == usuario && element.US_IDSALESPOINT == ptovta) {
        bol_existe = true;
      }
    });


    if (bol_existe) {
      this.ShowError("El usuario ya esta asignado al punto de venta seleccionado");
      return
    }

    let ent = this.forma.value;
    this.bol_cargando = true;
    this._sm.nuevoPtoVtaxUsuario(ent).then(
      res => {
        if (res == "ok") {
          this.bol_cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo el proyecto correctamente";
          this.cargarPuntosvtaxUsuarios()

          setTimeout(() => {
            this.forma.reset({ 'US_IDCOMPANY': '1' });
            this.bol_msj = false;
          }, 1500);

        }
      }
    )


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
