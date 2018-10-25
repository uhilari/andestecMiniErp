import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly baseAppEmpresa: number = 1;
    readonly baseAppUsuario: string = 'cbazan';
    readonly baseAppUrl: string = 'http://localhost:22900/';
    readonly baseAPIUrl: string = 'http://localhost:22900/';
    //readonly baseAPIUrl: string = 'http://209.45.54.221/almacen/api/';
}