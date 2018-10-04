import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPEPROVIDER } from '../../shared/modelos/MA_TYPEPROVIDER';

@Component({
  selector: 'app-tipoproveedorlist',
  templateUrl: './tipoproveedorlist.component.html',
  styles: []
})
export class TipoproveedorlistComponent implements OnInit {
  eTipoProveedor: MA_TYPEPROVIDER[];

  constructor(private maestroServicio: MaestrosService) {
    maestroServicio.getTipoProveedores()
      .subscribe((resp: MA_TYPEPROVIDER[]) => {
        this.eTipoProveedor = resp;        
      });
  }

  borrarTipoProveedor(id: string) {
    this.maestroServicio.borrarTipoProveedor(id);
  }

  ngOnInit() {
  }

}
