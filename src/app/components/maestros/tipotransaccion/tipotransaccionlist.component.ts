import { Component } from '@angular/core';
import { Ma_TipoTransaccion } from '../../shared/modelos/Ma_TipoTransaccion';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-tipotransaccionlist',
  templateUrl: './tipotransaccionlist.component.html',
  styleUrls: []
})
export class TipotransaccionlistComponent  {

  eTipoT: Ma_TipoTransaccion [];

  constructor(private maestroServicio: MaestrosService) {    
    this.cargarListado();  
  }

  cargarListado(){
    this.maestroServicio.getTipoTs()
    .subscribe((resp: Ma_TipoTransaccion[]) => {
      this.eTipoT = resp;
      console.log(resp);
    });
  }

  borrartipot(codigo: string) {
    this.maestroServicio.borrarUnidadMed(codigo);
    this.cargarListado();
  }

}
