export class MS_VOUCHERDE {
    public VD_IDVOUCHERHE: number;
    public VD_ITEM: number;
    public VD_IDARTICULO: number
    public VD_DEARTICULO: string;
    public VD_QTY: number;
    public VD_UNITPRICE: number;
    public VD_TOTALPRICE: number;
    public VD_COMMENT: string;
    public VD_ISTATUS: string;
    public VD_IDORDER: number;
    public VD_IDLOTE: string;
    public VD_XIGV: number;
    public VD_XSUBT: number;
    public VD_XTOT: number;

    constructor(id: number, item: number,
        ida: number, arti: string,
        qty: number, pre: number, tot: number,
        co: string, est: string, idord: number, numLote: string,
        xigv: number, xsubt: number, xtot: number) {

        this.VD_IDVOUCHERHE = id;
        this.VD_ITEM = item;
        this.VD_IDARTICULO = ida;
        this.VD_DEARTICULO = arti;
        this.VD_QTY = qty;
        this.VD_UNITPRICE = pre;
        this.VD_TOTALPRICE = tot;
        this.VD_COMMENT = co;
        this.VD_ISTATUS = est;
        this.VD_IDORDER = idord;
        this.VD_IDLOTE = numLote;
        this.VD_XIGV = xigv;
        this.VD_XSUBT = xsubt;
        this.VD_XTOT = xtot;
    }
}