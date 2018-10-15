import { ECA_COLLECTIONREP } from "./ECA_COLLECTIONREP";

export class ECA_COLLECTION extends ECA_COLLECTIONREP {
    constructor(
        public CO_ID: number,
        public CO_PLACE_SALES: string,
        public CO_DATE: Date,
        public CO_ISTATUS: string,
        public CO_IDCOMPANY: number,
        public COBSOL: number,
        public COBDOL: number,
        public FECHAINI: string,
        public FECHAFIN: string
    ) {
        super(COBSOL, COBDOL, FECHAINI, FECHAFIN)
    }
}