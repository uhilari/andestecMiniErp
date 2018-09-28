import { MS_VOUCHERHE } from "./MS_VOUCHERHE";
import { MS_VOUCHERDE } from "./MS_VOUCHERDE";

export class MS_VOUCHER {
    public Cabecera: MS_VOUCHERHE;
    public Detalle: MS_VOUCHERDE[];
    
    constructor(c: MS_VOUCHERHE, d: MS_VOUCHERDE[]) {
        this.Cabecera = c;
        this.Detalle = d;
    }
}