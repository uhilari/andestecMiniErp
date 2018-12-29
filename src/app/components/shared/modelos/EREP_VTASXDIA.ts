export class EREP_VTASXDIA {

    constructor(
        public CLIENTE: string,
        public FECHA: string,
        public TIPDOC: string,
        public SERDOC: string,
        public NUMDOC: string,
        public MONEDA: string,
        public VALORVTA: number,
        public IMPUESTO: number,
        public TOTAL: number,
        public TC: number,
        public TIPOPAGO: string,
        public TARJETA: string,
        public NUMOPE: string,
        public MONTOPAGADO: number
    ) {

    }
}