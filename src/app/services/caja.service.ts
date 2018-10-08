import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  gIdEmpresa: number = 1;
  //gApiURL: string = 'http://209.45.54.221/almacen/api/';
  gApiURL: string = 'http://localhost:22900/';
  gUsuario: string = 'cbazan';

  constructor(private http: HttpClient) { }
}
