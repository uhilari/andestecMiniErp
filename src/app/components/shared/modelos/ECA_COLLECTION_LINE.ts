export class ECA_COLLECTION_LINE {
    constructor(
        public CL_ID:number,
        public CL_ITEM : number,
        public CL_TYPE_DOC : string,
        public CL_SERIE_DOC: string,
        public CL_NUMBER_DOC : string,
        public CL_TYPE_OPERATION : string,
        public CL_DATE : Date,
        public CL_AMOUNT: number,
        public CL_CURRENCY_ID : string,
        public CL_SELL_RATE: number,
        public CL_COMMENT: string,
        public CL_SALES_ID : string,
        public CL_BANK_ID : string,
        public CL_DOC_REF: string,
        public CL_SERIE_REF: string,
        public CL_NUM_REF: string,
        public CL_BANK_BUSSINESS : string,
        public CL_ACCOUNT_BANK_CHECK : string,
        public CL_PAYMENT_METHOD : string,
        public CL_OPT_AN: string,
        public CL_DATE_REF: Date
    ) {
        
    }
}