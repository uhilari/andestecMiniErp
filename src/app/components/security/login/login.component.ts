import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(
    private _tokenService: TokenService, 
    private _router: Router,
    private _route: ActivatedRoute) { }

  nickModel = '';
  claveModel = '';

  private _returnUrl: string = "";

  ngOnInit() {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this._tokenService.Autenticado(this.nickModel, this.claveModel)
      .subscribe(u => {
        console.log('datos desde autenticado', u);
        this._router.navigate([this._returnUrl]);
      });
  }


  


}
