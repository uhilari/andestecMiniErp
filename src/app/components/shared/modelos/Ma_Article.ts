export class Ma_Article {
  constructor(
    public ID_ARTICLE: number,
    public ID_COMPANY: number,
    public ID_COMMODITY_TYPE: string,
    public ID_UNIT: string,
    public ID_FAMILY: number,
    public ID_FAMILY_SUB: number,
    public SKU_ARTICLE: string,
    public DESCRIPTION_ARTICLE: string,
    public COMMERCIAL_NAME: string,
    public TECHNICAL_NAME: string,
    public SIZE: string,
    public COLORS: string,
    public BRAND: string,
    public MODEL: string,
    public AIMAGE: string,
    public DATA_SHEET: string,
    public AUSUARIO: string,
    public AFECREG: string,
    public AMODIFICO: string,
    public AFECMOD: string,
    public AISSERVICE: string,
    public ISTATUS: string,
    public COD_ALT: string,
    public COD_EAN: string,
    public COD_SUNAT: string
  ) { }
}