export class ECA_CUSTOM_BALANCE {
    constructor(
        public CM_ID: number,
        public CM_CUSTOMER_ID: number,
        public CM_DOCUMENT_ID: string,
        public CM_SERIR_DOC: string,
        public CM_NUMBER_DOC: string,
        public CM_DOC_DATE: Date,
        public CM_CADUCATE_DATE: Date,
        public CM_SALES_ID: string,
        public CM_AMOUNT: number,
        public CM_AMOUNT_BALANCE: number,
        public CM_CURRENCY_ID: string,
        public CM_SELL_RATE: number,
        public CM_ISTATUS: string,
        public CM_TERMS: string,
        public CM_PLACE_SALES: string,
        public OC_AUSUARIO: string,
        public OC_AFECREG: Date,
        public OC_AMODIFICO: string,
        public OC_AFECMOD: Date,
        public CM_IDCOMPANY: number
    ) {

    }
}