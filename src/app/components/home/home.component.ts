import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../../services/maestros.service';
import { AppGlobals } from "../shared/modelos/app.global";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(
    private maestroService: MaestrosService,
    private appglo: AppGlobals) {

  }

  ngOnInit() {

    // console.log('valor de empresa:', this.appglo.baseAppEmpresa);
    // localStorage.setItem('', '');
  }

}
