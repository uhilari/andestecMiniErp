export class EMS_ORDERDET {
    public OD_IDORDERCAB: number;
    public OD_ITEM: number;
    public OD_IDARTICULO: number;
    public OD_DEARTICULO: string;
    public OD_QTY: number;
    public OD_UNITPRICE: number;
    public OD_TOTALPRICE: number;
    public OD_ISTATUS: string
    public OD_QTY_DISPA: number;
    constructor(id: number, i: number, ida: number, dear: string, qty: number, pre: number, tot: number, est: string, qtydis: number) {
        this.OD_IDORDERCAB = id;
        this.OD_ITEM = i;
        this.OD_IDARTICULO = ida;
        this.OD_DEARTICULO = dear;
        this.OD_QTY = qty;
        this.OD_UNITPRICE = pre;
        this.OD_TOTALPRICE = tot;
        this.OD_ISTATUS = est;
        this.OD_QTY_DISPA = qtydis;
    }
}