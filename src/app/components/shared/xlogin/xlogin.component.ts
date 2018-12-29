import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MaestrosService } from 'src/app/services/maestros.service';
import { EMA_USERSALESPOINT } from '../modelos/EMA_USERSALESPOINT';


@Component({
  selector: 'app-xlogin',
  templateUrl: './xlogin.component.html',
  styleUrls: ['./xlogin.component.css']
})
export class XloginComponent implements OnInit {

  listaPtosVta: EMA_USERSALESPOINT[] = [];
  xcorreo: string = '';
  xclave: string = '';
  xempresa: number = 0;
  xptoVenta: string = '';

  bol_cargando: boolean;


  constructor(
    private router: Router,
    private _ms: MaestrosService) { }

  ngOnInit() {
  }

  signin() {

    if (this.xcorreo == 'admin@empresa1.com') {
      this.xempresa = 1;
    }

    if (this.xcorreo == 'admin@empresa2.com') {
      this.xempresa = 2;
    }

    if (this.xcorreo == 'admin@empresa3.com') {
      this.xempresa = 3;
    }

    if (this.xcorreo == 'admin@empresa4.com') {
      this.xempresa = 4;
    }


    this.xptoVenta = "";


    //1.tenemos que buscar el punto de venta por el usuario que se loguea ==> de la BD->MA_USERSALESPOINT 
    //2.registramos la variable en el localStorage
    //3.redirigimos al home
    this.bol_cargando = true;
    this._ms.getPtoVtaxUsuario(this.xempresa).then(
      (res: EMA_USERSALESPOINT[]) => {
        this.bol_cargando = false;

        res.forEach(element => {
          if (element.US_IDUSER == this.xcorreo) {
            this.xptoVenta = element.US_IDSALESPOINT;
          }
        });


        if (this.xptoVenta == "") {
          this.xptoVenta = "P09";
          alert("Falta asignar punto de venta al usuario");
        }


        localStorage.setItem('rtxUsu', this.xcorreo);
        localStorage.setItem('rtxEmp', this.xempresa.toString());
        localStorage.setItem('rtxPtoVta', this.xptoVenta.toString());


        this.router.navigate(['/home']);

      }
    ).catch(err => { alert('ocurrio un error: ' + err) });








  }


}
