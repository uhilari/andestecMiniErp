import { Component} from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_DOCUMENTS } from '../../shared/modelos/MA_DOCUMENTS';

@Component({
  selector: 'app-documentoslist',
  templateUrl: './documentoslist.component.html',
  styleUrls: []
})
export class DocumentoslistComponent  {

  eDocumentos : MA_DOCUMENTS[];

  constructor(private maestroServicio: MaestrosService) {
    maestroServicio.getDocumentos()
      .subscribe((resp: MA_DOCUMENTS[]) => {
        this.eDocumentos = resp;        
      });
   }

  
   borrarDocumento(id: string) {
    this.maestroServicio.borrarDocumento(id);
  }

}
