import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_PAYMENTTYPE } from '../../shared/modelos/MA_PAYMENTTYPE';

@Component({
  selector: 'app-formapago',
  templateUrl: './formapago.component.html',
  styleUrls: []
})
export class FormapagoComponent {
  forma: FormGroup;
  eFormapago: MA_PAYMENTTYPE;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'PT_ID': new FormControl('', Validators.required),
      'PT_DES': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getFormaPago(this.id)
          .subscribe((res: MA_PAYMENTTYPE) => {
            console.log(res);

            this.forma.get('PT_ID').setValue(res.PT_ID);
            this.forma.get('PT_DES').setValue(res.PT_DES)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;
    this.eFormapago = new MA_PAYMENTTYPE(
      this.forma.get('PT_ID').value,
      this.forma.get('PT_DES').value, 1);
    this.maestroSevicio.nuevoFormaPago(this.eFormapago);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }


}
