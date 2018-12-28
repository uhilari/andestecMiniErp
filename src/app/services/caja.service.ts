import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ECA_COLLECTION } from '../components/shared/modelos/ECA_COLLECTION';
import { ECA_COLLECTION_LINE } from '../components/shared/modelos/ECA_COLLECTION_LINE';
import { AppGlobals } from '../components/shared/modelos/app.global';


@Injectable({
    providedIn: 'root'
})
export class CajaService {

    gIdEmpresa: number = 0;
    gApiURL: string = '';
    gUsuario: string = '';
    gPuntoVta: string = 'P01';

    constructor(private http: HttpClient, private appglo: AppGlobals) {
        this.gApiURL = this.appglo.baseAPIUrl;
        this.gIdEmpresa = this.appglo.baseAppEmpresa;
        this.gUsuario = this.appglo.baseAppUsuario;
    }


    getListadoPlanillaCab(f1: string, f2: string) {

        return this.http.get(this.gApiURL + 'CA_COLLECTION/' + this.gIdEmpresa + '/' + f1 + '/' + f2);
    }

    getListadoPlanillaDet(idpla: string) {
        return this.http.get(this.gApiURL + 'CA_COLLECTION/' + this.gIdEmpresa + '/LISDET/' + idpla);
    }

    getCarteraPorCliente(cliente: number): Promise<any> {
        return new Promise((resolver, rechazar) => {
            return this.http.get(this.gApiURL + 'CA_CUSTOM_BALANCE/' + this.gIdEmpresa + '/' + cliente)
                .subscribe((res: number) => resolver(res), error => rechazar(error));
        });
    }

    postGrabarPlanilla(eCabPlanilla: ECA_COLLECTION): Promise<any> {

        let rpta: number = 0;
        eCabPlanilla.CO_PLACE_SALES = this.gPuntoVta;
        eCabPlanilla.CO_IDCOMPANY = this.gIdEmpresa;

        return new Promise((resolver, rechazar) => {

            let apiURL: string = this.gApiURL + "CA_COLLECTION";
            let body = JSON.stringify(eCabPlanilla);
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            this.http.post(apiURL, body, { headers })
                .subscribe((r: number) => {
                    console.log('respuesta de post', r);
                    rpta = r;
                    resolver(rpta);
                }, error => {
                    console.log('oops', error);
                    rechazar();
                });

        });
    }

    postGrabarDetPlanilla(detalle: ECA_COLLECTION_LINE[]) {

        return new Promise((resolver, rechazar) => {

            let apiURL: string = this.gApiURL + "CA_COLLECTION/REGDOC";
            let body = JSON.stringify(detalle);
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            this.http.post(apiURL, body, { headers })
                .subscribe((r: number) => {
                    console.log('respuesta de post', r);
                    resolver(r);
                }, error => {
                    console.log('oops', error);
                    rechazar(error);
                });

        });

    }


}
