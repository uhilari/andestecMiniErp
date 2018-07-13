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
    this.eUnidades = maestroServicio.getUnidades();
  }

  borrarUnidad(codigo: number) {
    console.log("Borrando unidad: ", codigo);
  }

}
