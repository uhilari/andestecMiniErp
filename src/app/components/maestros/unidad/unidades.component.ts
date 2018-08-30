import { Component } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Unit } from '../../shared/modelos/Ma_Unit';



@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styles: []
})
export class UnidadesComponent  {
  eUnidades: Ma_Unit [];

  constructor(private maestroServicio: MaestrosService) {    
    this.cargarListado();  
  }

  cargarListado(){
    this.maestroServicio.getUnidades()
    .subscribe((resp: Ma_Unit[]) => {
      this.eUnidades = resp;
      console.log(resp);
    });
  }

  borrarUnidad(codigo: string) {
    this.maestroServicio.borrarUnidadMed(codigo);
    this.cargarListado();
  }

}
