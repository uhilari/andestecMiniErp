import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  gIdEmpresa: number = 1;
  //gApiURL: string = 'http://209.45.54.221/almacen/api/';
  gApiURL: string = 'http://localhost:22900/';
  gUsuario: string = 'cbazan';
  constructor(private http: HttpClient) { }


  GetRepAlmacenKardex(alm: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/' + alm + '/kardex/' + f1 + '/' + f2);
  }

  GetRepAlmacenTransacciones(tt: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/transaccion/' + tt);
  }

  GetRepAlmacenStock(alm: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/stock/' + alm);
  }

  GetRepVentasxVendedor(vend: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/vtaxven/' + vend +'/'+ f1 + '/' + f2);
  }

  GetRepVentasxArticulo(arti: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/vtaxart/' + arti +'/'+ f1 + '/' + f2);
  }

  GetRepVentasxCliente(cli: string, f1: string, f2: string) {
    return this.http.get(this.gApiURL + 'RE_REPORTS/' + this.gIdEmpresa + '/vtaxcli/' + cli +'/'+ f1 + '/' + f2);
  }

}



