export class Ma_Warehouse {
    public ID_WAREHOUSE: string;
    public DESCRIPCION: string;
    public DIRECCION: string;
    public ID_COMPANY: number;
    public NUMCORRE_I: number;
    public NUMCORRE_S: number;

    constructor(
        _ID_WAREHOUSE: string,
        _DESCRIPCION: string,
        _DIRECCION: string,
        _ID_COMPANY: number,
        _NUMCORRE_I:number,
        _NUMCORRE_S:number,
    ) {
        this.ID_WAREHOUSE = _ID_WAREHOUSE,
            this.DESCRIPCION = _DESCRIPCION,
            this.DIRECCION = _DIRECCION,
            this.ID_COMPANY = _ID_COMPANY,
            this.NUMCORRE_I = _NUMCORRE_I,
            this.NUMCORRE_S = _NUMCORRE_S
    }

}