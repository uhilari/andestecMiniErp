import { Component, OnInit } from '@angular/core';
import { EMA_CURRENCY_EXCHANGE } from '../../shared/modelos/EMA_CURRENCY_EXCHANGE';
import { MaestrosService } from 'src/app/services/maestros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Button } from 'protractor';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-tcambiolist',
  templateUrl: './tcambiolist.component.html',
  styleUrls: ['./tcambiolist.component.css']
})
export class TcambiolistComponent implements OnInit {
  tcambios: EMA_CURRENCY_EXCHANGE[] = [];
  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;
  forma: FormGroup;
  frmNuevo: FormGroup;
  cargando: boolean;
  bol_msj: boolean;
  msj_ok: string;

  constructor(private ms: MaestrosService) {

    let fecha = new Date();
    this.forma = new FormGroup({
      'f_txtayo': new FormControl(fecha.getFullYear()),
      'f_txtmes': new FormControl(fecha.getMonth() + 1)
    });

    this.frmNuevo = new FormGroup({
      'CHANGEDATE': new FormControl(fecha),
      'IDCURRENCY': new FormControl('DOL'),
      'BUY': new FormControl('0.00'),
      'SELL': new FormControl('0.00')
    });


  }

  ngOnInit() {
    this.cargardata();
  }

  abrirModalNuevo() {
    $('#ModalNuevo').modal();
  }

  cerrarModalNuevo() {
    $('#ModalNuevo').modal('hide');
  }

  cargardata() {

    let ayo: number = this.forma.get('f_txtayo').value;
    let mes: number = this.forma.get('f_txtmes').value;

    this.bol_cargando = true;
    this.ms.getTipoCambiosporMes(ayo, mes).then(
      (res: EMA_CURRENCY_EXCHANGE[]) => {
        this.tcambios = res;
        this.bol_cargando = false;
      }).catch(err => this.bol_cargando = false);
  }


  borrarTc(ent: EMA_CURRENCY_EXCHANGE) {
    console.log('borrando: ', ent);
    this.ms.borrarTC(ent).then(res => {

      if (res == "ok") {
        swal('Good job!', 'Registro borrado', 'success');
        this.cargardata();
      } else {
        swal('Ocurrio un error!', res, 'error');
      }
    }).catch(err => { swal('Ocurrio un error!', err, 'error'); });

  }

  imprimir() {
    window.print();
  }

  grabarTC() {

    this.cargando = true;
    let eTC = new EMA_CURRENCY_EXCHANGE(
      this.frmNuevo.get('CHANGEDATE').value,
      this.frmNuevo.get('IDCURRENCY').value,
      this.frmNuevo.get('BUY').value,
      this.frmNuevo.get('SELL').value,
      1);

    this.ms.nuevoTC(eTC).then(res => {
      if (res == "ok") {
        this.frmNuevo.reset();
        this.cargando = false;
        this.bol_msj = true;
        this.msj_ok = "Se grabo el tipo de cambio correctamente";
        this.cargardata();

        setTimeout(() => {
          this.bol_msj = false;
          this.cerrarModalNuevo();
        }, 1500);
      }
    }).catch(err => { this.cargando = false; swal('Ocurrio un error', err, "error") });

  }

}
