import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Seg_Usuario } from '../components/shared/modelos/SEG_Usuario';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../components/shared/modelos/app.global';

@Injectable({ providedIn: 'root' })
export class SeguridadService {
  private gApiURL = '';

  constructor(private http: HttpClient, private appglo: AppGlobals) {
    this.gApiURL = this.appglo.adminAPIUrl;
  }
  
  public getUsuarios(): Observable<Seg_Usuario[]> {
    return this.http.get<any>(this.gApiURL + 'usuarios?start=0')
      .pipe(map(r => r.items));
  }

  public getUsuario(id: string): Observable<Seg_Usuario> {
    return this.http.get<Seg_Usuario>(this.gApiURL + 'usuarios/' + id);
  }

  public grabarUsuario(usuario: Seg_Usuario): Observable<any> {
    if (usuario.id) {
      return this.http.put(this.gApiURL + 'usuarios/' + usuario.id, usuario)
        .pipe(map(r => "ok"));
    }
    return this.http.post(this.gApiURL + 'usuarios', usuario)
      .pipe(map(r => (r ? "ok" : null)));
  }

  public borrarUsuario(id: string): Observable<any> {
    return this.http.delete<any>(this.gApiURL + 'usuarios/' + id)
      .pipe(map(r => "ok"));
  }
}
