import { ERE_VISTAPEDIDOCAB } from "./ERE_VISTAPEDIDOCAB";
import { ERE_VISTAPEDIDODET } from "./ERE_VISTAPEDIDODET";

export class ERE_VISTAPEDIDO {
    public Cabecera: ERE_VISTAPEDIDOCAB;
    public Detalle: ERE_VISTAPEDIDODET[];
    constructor() { }
}