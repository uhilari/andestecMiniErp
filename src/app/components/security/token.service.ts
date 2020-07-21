import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppGlobals } from '../shared/modelos/app.global';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static TOKEN_KEY: string = "kn-token";
  private apiUrl: string;

  constructor(private _http: Http, appGlobals: AppGlobals) { 
    this.apiUrl = appGlobals.adminAPIUrl;
  }

  public Autenticado(ruc: string,nick: string, clave: string): Observable<TokenResponse> {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    //let params = "Usuario=" + nick + "&Clave=" + clave;
    const params = 'Ruc=' + ruc + '&Usuario=' + nick + '&Clave=' + clave;
    return this._http.post(this.apiUrl + "oauth", params, { headers: headers })
      .pipe(map(r => {
        let data = r.json();
        if (data !== null) {
          let token = {
            token: data.token,
            expira: new Date(data.expira),
            isAdmin: data.esAdmin
          };
          let strToken = JSON.stringify(token);
          localStorage.setItem(TokenService.TOKEN_KEY, strToken);
        }
        return {
          nombre: data.nombre,
          empresa: data.empresa
        };
      }));
  }

  public EstaAutenticado(): boolean {
    let strToken = localStorage.getItem(TokenService.TOKEN_KEY);
    if (strToken === null || strToken === "") {
      return false;
    }
    let token: TokenData = JSON.parse(strToken);
    if (token == null)
      return false;
    token.expira = new Date(token.expira);
    let actual = new Date();
    if (token.expira < actual) {
      localStorage.removeItem(TokenService.TOKEN_KEY);
      return false;
    }
    return true;
  }

  public Get(): TokenData {
    let strToken = localStorage.getItem(TokenService.TOKEN_KEY);
    if (strToken != null && strToken !== "") {
      let token = JSON.parse(strToken);
      token.expira = new Date(token.expira);
      return token;
    }
    return null;
  }

  public ClearToken() {
    localStorage.removeItem(TokenService.TOKEN_KEY);
  }
}

interface TokenData {
  token: string,
  expira: Date,
  isAdmin: boolean
}

interface TokenResponse {
  nombre: string;
  empresa: string;
}
