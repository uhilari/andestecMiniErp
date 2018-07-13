export class Ma_Center_Cost {
    public ID_COMPANY: number;
    public ID_CENTER_COST: number;
    public DESCRIPTION_CENTER_COST: string
    constructor(
        _ID_COMPANY: number,
        _ID_CENTER_COST: number,
        _DESCRIPTION_CENTER_COST: string
    ) {
        this.ID_COMPANY = _ID_COMPANY;
        this.ID_CENTER_COST = _ID_CENTER_COST;
        this.DESCRIPTION_CENTER_COST = _DESCRIPTION_CENTER_COST;
    }
}