import { EMS_ORDERCAB } from "./EMS_ORDERCAB";
import { EMS_ORDERDET } from "./EMS_ORDERDET";

export class EMS_ORDER {

    public Cabecera: EMS_ORDERCAB;
    public Detalle: EMS_ORDERDET[];

    constructor(c: EMS_ORDERCAB, d: EMS_ORDERDET[]) {
        this.Cabecera = c;
        this.Detalle = d;
    }
}

