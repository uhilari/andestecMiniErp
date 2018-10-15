import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ECA_COLLECTION } from '../components/shared/modelos/ECA_COLLECTION';
import { ECA_COLLECTIONREP } from '../components/shared/modelos/ECA_COLLECTIONREP';
import { ECA_COLLECTION_LINE } from '../components/shared/modelos/ECA_COLLECTION_LINE';


@Injectable({
    providedIn: 'root'
})
export class CajaService {

    gIdEmpresa: number = 1;
    //gApiURL: string = 'http://209.45.54.221/almacen/api/';
    gApiURL: string = 'http://localhost:22900/';
    gUsuario: string = 'cbazan';
    gPuntoVta: string = 'P01';

    constructor(private http: HttpClient) { }


    getListadoPlanillaCab(f1: string, f2: string) {
        return this.http.get(this.gApiURL + 'CA_COLLECTION/' + this.gIdEmpresa + '/' + f1 + '/' + f2);
    }

    getCarteraPorCliente(cliente: number) {
        return this.http.get(this.gApiURL + 'CA_CUSTOM_BALANCE/' + this.gIdEmpresa + '/' + cliente);
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
