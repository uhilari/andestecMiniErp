import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from 'src/app/services/maestros.service';
import { EMA_USERSALESPOINT } from '../../shared/modelos/EMA_USERSALESPOINT';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  listaPtosVta: EMA_USERSALESPOINT[] = [];
  xcorreo: string = '';
  xclave: string = '';
  xempresa: number = 0;
  xptoVenta: string = '';

  constructor(
    private _tokenService: TokenService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _ms: MaestrosService) { }

  nickModel = '';
  claveModel = '';

  private _returnUrl: string = "";

  ngOnInit() {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    // console.log('datos del login',this.nickModel, this.claveModel);

    this._tokenService.Autenticado(this.nickModel, this.claveModel)
      .subscribe(u => {
        console.log('datos desde autenticado', u);

        this.xempresa = parseInt(u.empresa);
        this.xcorreo = u.nombre;

        this._ms.getPtoVtaxUsuario(this.xempresa).then(
          (res: EMA_USERSALESPOINT[]) => {
            res.forEach(element => {
              if (element.US_IDUSER == this.nickModel) {
                this.xptoVenta = element.US_IDSALESPOINT;
              }
            });


            if (this.xptoVenta == "") {
              this.xptoVenta = "P09";
              alert("Falta asignar punto de venta al usuario");
            }

            localStorage.setItem('rtxUsu', this.xcorreo.toString());
            localStorage.setItem('rtxEmp', this.xempresa.toString());
            localStorage.setItem('rtxPtoVta', this.xptoVenta.toString());

            this._router.navigate([this._returnUrl]);

          }
        ).catch(err => { alert('ocurrio un error: ' + err) });

        
      });
  }

}
