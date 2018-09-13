import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_PROJECT } from '../../shared/modelos/MA_PROJECT';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: []
})
export class ProyectoComponent {
  forma: FormGroup;
  eProyecto: MA_PROJECT;
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
      'PJ_ID': new FormControl('', Validators.required),
      'PJ_DES': new FormControl('', Validators.required),
    });
    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getProyecto(this.id)
          .subscribe((res: MA_PROJECT) => {
            this.forma.get('PJ_ID').setValue(res.PJ_ID);
            this.forma.get('PJ_DES').setValue(res.PJ_DES)
          });
      }
    });
  }

guardarCambios() {
    this.cargando = true;
    this.eProyecto = new MA_PROJECT(
      this.forma.get('PJ_ID').value,
      this.forma.get('PJ_DES').value, 1);
    this.maestroSevicio.nuevoProyecto(this.eProyecto);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }

}
