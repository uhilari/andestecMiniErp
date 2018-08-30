import { Tra_Warehouse } from "./Tra_Warehouse";
import { Tra_Warehouse_Line } from "./Tra_Warehouse_Line";

export class Tra_Guiaing {
    public cabecera: Tra_Warehouse;
    public detalle: Tra_Warehouse_Line[]
    constructor(c: Tra_Warehouse, d: Tra_Warehouse_Line[]) {
        this.cabecera = c;
        this.detalle = d;
    }
}
