import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransaccionesService } from '../../../services/transacciones.service';
import { Re_VistaCabAlm } from '../../shared/modelos/Re_VistaDocAlm';
import { Re_VistaDet } from '../../shared/modelos/Re_VistaDet';


@Component({
  selector: 'app-vistadocumento',
  templateUrl: './vistadocumento.component.html',
  styleUrls: []
})
export class VistadocumentoComponent {

  id: number = 0;
  eDocumento: Re_VistaCabAlm = {
    Cabecera: {},
    Detalle: []
  };
  eDetalles: Re_VistaDet[];

  constructor(
    private transServicio: TransaccionesService,
    private router: Router,
    private route: ActivatedRoute) {

    route.params.subscribe(parametros => this.id = parametros['id'])

    //detalles
    transServicio.getRepListado05(this.id).subscribe(
      (det: Re_VistaDet[]) => {
        this.eDetalles = det;
        console.log(this.eDetalles);

      }
    );

    //cabecera
    transServicio.getRepListado06(this.id).subscribe(
      (data: Re_VistaCabAlm) => {
        console.log('data:', data);
        this.eDocumento = data;
        console.log('eDocumento:', this.eDocumento);

      }, err => console.log(err)
    );

  }

  //funcion imprimir
  imprimir() {
    window.print();
  }



}
