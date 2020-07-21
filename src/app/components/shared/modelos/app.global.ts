import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    public baseAppEmpresa: number = 1;
    public baseAppUsuario: string = 'cbazan';
    public basePuntoVenta: string = 'P01';

    readonly baseAppUrl: string = '';
    //readonly adminAPIUrl: string = 'http://localhost:50999/';
    readonly adminAPIUrl: string = 'http://admin.ayninet.com/api/';
    //readonly baseAPIUrl: string = 'http://localhost:22900/';                 //local de visual studio
    //readonly baseAPIUrl: string = 'http://209.45.54.221/almacen/api/';         // API por IP
    readonly baseAPIUrl: string = 'http://www.ayninet.com/api/';                     //api por www
        
    constructor() {

        console.log('cargando data de localstorage..');

        this.baseAppEmpresa = Number.parseInt(localStorage.getItem('rtxEmp'));
        this.baseAppUsuario = localStorage.getItem('rtxUsu');
        this.basePuntoVenta = localStorage.getItem('rtxPtoVta');

        console.log('global', this.baseAppUsuario)
        console.log('global', this.baseAppEmpresa)
        console.log('global', this.basePuntoVenta)

    }

}