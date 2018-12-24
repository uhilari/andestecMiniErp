import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    public baseAppEmpresa: number = 1;
    public baseAppUsuario: string = 'cbazan';
    public basePuntoVenta: string = 'P01';

    readonly baseAppUrl: string = 'http://localhost:22900/';
    //readonly baseAPIUrl: string = 'http://localhost:22900/';
    readonly baseAPIUrl: string = 'http://209.45.54.221/almacen/api/';

    constructor() {

        console.log('cargando data de localstorage..');
     





        this.baseAppEmpresa = Number.parseInt(localStorage.getItem('rtxEmp'));
        this.baseAppUsuario = localStorage.getItem('rtxUsu');
        this.basePuntoVenta = localStorage.getItem('rtxPtoVta');


        console.log(this.baseAppUsuario)
        console.log(this.baseAppEmpresa)
        console.log(this.basePuntoVenta)

    }

}