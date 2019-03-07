import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaestrosService } from 'src/app/services/maestros.service';
import { EMA_CONFIGGEN } from '../../shared/modelos/EMA_CONFIGGEN';
import { switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {
  confis: EMA_CONFIGGEN;
  forma: FormGroup;

  constructor(private ms: MaestrosService) {

    this.forma = new FormGroup({
      'f_chkPreciosIVA': new FormControl('')
    })


  }

  ngOnInit() {

    this.ms.getConfiguraciones()
      .then(res => {
        this.confis = res;
        let preiva: boolean = false;
        if (this.confis.PRE_IVA === 'S') { preiva = true; }
        this.forma.get('f_chkPreciosIVA').setValue(preiva);
      })
      .catch(err => console.log('Error:', err)
      );

  }


  grabar() {
    let preiva = 'N';
    if (this.forma.get('f_chkPreciosIVA').value) {
      preiva = 'S';
    }
    let entConf = new EMA_CONFIGGEN(preiva, 1);
    this.ms.nuevoConfiguraciones(entConf).then(
      res => {
        if (res == 'ok') {
          alert('Los datos se actualizaron correctamente');
        } else {
          console.log('Algo paso: ', res);
        }
      }).catch(err => console.log('Ocurrioun error: ', err));
  }

}
