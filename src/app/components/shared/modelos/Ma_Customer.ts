export class Ma_Customer {
    constructor(
        public ID_CUSTOMER: number,
        public ID_COMPANY: number,
        public DESCRIPTION_CUSTOMER: string,
        public DOCUMENT_TYPE_CUSTOMER: string,
        public NUMBER_DOCUMENT: string,
        public NIF_ADDRESS: string,
        public DELIVERY_ADDRESS: string,
        public COMMERCIAL_TYPE: string,
        public CUSTOMER_TYPE: string,
        public PRICE_TYPE: string,
        public IDPAYMENTYPE: string,
        public CREDIT_LIMIT_LOCAL: number,
        public CREDIT_LIMIT_USD: number,
        public CONTACT: string,
        public MOVIL_CONTACT: string,
        public EMAIL: string,
        public ISTATUS: number,
        public SALES_CODE: string,
        public AUSUARIO: string,
        public AFECREG: string,
        public AMODIFICO: string,
        public AFECMOD: string
    ) { }
}