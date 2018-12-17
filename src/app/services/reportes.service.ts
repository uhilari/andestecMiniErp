import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppGlobals } from '../components/shared/modelos/app.global';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  gIdEmpresa: number = 0;
  gApiURL: string = '';
  gUsuario: string = '';

  constructor(private http: HttpClient, private appglo: AppGlobals) {
    this.gApiURL = this.appglo.baseAPIUrl;
    this.gIdEmpresa = this.appglo.baseAppEmpresa;
    this.gUsuario = this.appglo.baseAppUsuario;
  }


  GetRepAlmacenKardex(alm: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/' + alm + '/kardex/' + f1 + '/' + f2 + '/' + this.gUsuario.slice(0,-4));
  }

  GetRepAlmacenTransacciones(tt: string, alm: string, ayo: number, mes: number) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/transaccion/' + tt + '/' + alm + '/' + ayo.toString() + '/' + mes.toString());
  }

  GetRepAlmacenStock(alm: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/stock/' + alm);
  }

  GetRepVentasxVendedor(vend: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/vtaxven/' + vend + '/' + f1 + '/' + f2);
  }

  GetRepVentasxArticulo(arti: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/vtaxart/' + arti + '/' + f1 + '/' + f2);
  }

  GetRepVentasxCliente(cli: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/vtaxcli/' + cli + '/' + f1 + '/' + f2);
  }

}



