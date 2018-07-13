export class Tra_Warehouse_Line {
    public ID_COMPANY: number;
    public ID_TRANSACTION_WAREHOUSE_LINE: number;
    public ID_WAREHOUSE: string;
    public ITEM: number;
    public ID_ARTICLE: number;
    public DESCRIPTION_ARTICLE: string;
    public LOT: string;
    public SERIE: string;
    public QTY: number;
    public COST: number;
    public COMMENT: string;
    public ISTATUS: number;
    public AUSUARIO: string;
    public AFECREG: string;
    public AMODIFICO: string;
    public AFECMOD: string;
    constructor(
        _ID_COMPANY: number,
        _ID_TRANSACTION_WAREHOUSE_LINE: number,
        _ID_WAREHOUSE: string,
        _ITEM: number,
        _ID_ARTICLE: number,
        _DESCRIPTION_ARTICLE: string,
        _LOT: string,
        _SERIE: string,
        _QTY: number,
        _COST: number,
        _COMMENT: string,
        _ISTATUS: number,
        _AUSUARIO: string,
        _AFECREG: string,
        _AMODIFICO: string,
        _AFECMOD: string
    ) {
        this.ID_COMPANY = _ID_COMPANY,
            this.ID_TRANSACTION_WAREHOUSE_LINE = _ID_TRANSACTION_WAREHOUSE_LINE,
            this.ID_WAREHOUSE = _ID_WAREHOUSE,
            this.ITEM = _ITEM,
            this.ID_ARTICLE = _ID_ARTICLE,
            this.DESCRIPTION_ARTICLE = _DESCRIPTION_ARTICLE,
            this.LOT = _LOT,
            this.SERIE = _SERIE,
            this.QTY = _QTY,
            this.COST = _COST,
            this.COMMENT = _COMMENT,
            this.ISTATUS = _ISTATUS,
            this.AUSUARIO = _AUSUARIO,
            this.AFECREG = _AFECREG,
            this.AMODIFICO = _AMODIFICO,
            this.AFECMOD = _AFECMOD
    }
}