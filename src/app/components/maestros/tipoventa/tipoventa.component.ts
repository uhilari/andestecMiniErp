import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_SALESTYPE } from '../../shared/modelos/MA_SALESTYPE';

@Component({
  selector: 'app-tipoventa',
  templateUrl: './tipoventa.component.html',
  styleUrls: []
})
export class TipoventaComponent {
  forma: FormGroup;
  eTipoventa: MA_SALESTYPE;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.forma = new FormGroup({
      'ST_ID': new FormControl('', Validators.required),
      'ST_DES': new FormControl('', Validators.required),
    });
    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getTipoVenta(this.id)
          .subscribe((res: MA_SALESTYPE) => {
            this.forma.get('ST_ID').setValue(res.ST_ID);
            this.forma.get('ST_DES').setValue(res.ST_DES)
          });
      }
    });
  }

  
guardarCambios() {
  this.cargando = true;
  this.eTipoventa = new MA_SALESTYPE(
    this.forma.get('ST_ID').value,
    this.forma.get('ST_DES').value, 1);
  this.maestroSevicio.nuevoTipoVenta(this.eTipoventa);
  this.forma.reset();
  this.cargando = false;
  this.bol_msj = true;
  setTimeout(() => {
    this.bol_msj = false;
  }, 3000);
}


}
