import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: []
})
export class VendedorComponent {
  forma: FormGroup;
  eUnidad: EMA_SELLER;
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
      'SE_ID': new FormControl('', Validators.required),
      'SE_DESCRIPCION': new FormControl('', Validators.required)
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.maestroSevicio.getVendedor(this.id)
          .subscribe((res: EMA_SELLER) => {
            this.forma.get('SE_ID').setValue(res.SE_ID);
            this.forma.get('SE_DESCRIPCION').setValue(res.SE_DESCRIPCION)
          });
      }
    })

  }


  guardarCambios() {
    this.cargando = true;
    this.maestroSevicio.nuevoVendedor(
      new EMA_SELLER(
        this.forma.get('SE_ID').value,
        this.forma.get('SE_DESCRIPCION').value, 1));

    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }



}
