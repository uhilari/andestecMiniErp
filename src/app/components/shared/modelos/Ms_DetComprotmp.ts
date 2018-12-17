export class Ms_DetComprotmp {
    constructor(
        public item: number,
        public codigo: number,
        public articulo: string,
        public unidad: string,
        public cantidad: number,
        public preunit: number,
        public total: number,
        public estado: string,
        public glosa: string,
        public idpedido: number,
        public esLote:boolean,
        public numlote:string        
    ) { }
}