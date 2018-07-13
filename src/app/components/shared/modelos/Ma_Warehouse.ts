export class Ma_Warehouse {
    public ID_WAREHOUSE: number;
    public DESCRIPCION: string;
    public DIRECCION: string;
    public ID_COMPANY: number;

    constructor(
        _ID_WAREHOUSE: number,
        _DESCRIPCION: string,
        _DIRECCION: string,
        _ID_COMPANY: number
    ) {
        this.ID_WAREHOUSE=_ID_WAREHOUSE,
        this.DESCRIPCION=_DESCRIPCION,
        this.DIRECCION=_DIRECCION,
        this.ID_COMPANY=_ID_COMPANY
    }

}