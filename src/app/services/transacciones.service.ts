import { Injectable } from '@angular/core';
import { tra_DetalleIA } from '../components/shared/modelos/Tra_DetalleIA';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  eDetalleIA: tra_DetalleIA[] = [];

  constructor() {
    console.log("servicio transacciones listo para usarse!!");
  }

  agregarDetallesPrueba() {
    this.eDetalleIA.push(new tra_DetalleIA(1, "001", "lapttop xs TRR 244gh", "UNI", "LOT44", 4, "protocolo", "bultos", 150, "analisisis", "", "", ""));
    this.eDetalleIA.push(new tra_DetalleIA(2, "003", "mouse optioc lg", "UNI", "LOT100", 20, "protocolo", "bultos", 150, "analisisis", "", "", ""));
    this.eDetalleIA.push(new tra_DetalleIA(3, "004", "impresora laserJet 140", "UNI", "LOT001", 23, "protocolo", "bultos", 150, "analisisis", "", "", ""));
    this.eDetalleIA.push(new tra_DetalleIA(4, "077", "servidor hp 5540", "UNI", "", 6, "protocolo", "bultos", 150, "analisisis", "", "", ""));
  }

  getDetallesIA() {
    //this.agregarDetallesPrueba();
    //console.log(this.eDetalleIA);    
    return this.eDetalleIA;
  }

  setDetalleIA(ent: tra_DetalleIA) {
    console.log(this.eDetalleIA);

    let numItem: number = this.eDetalleIA.length;
    this.eDetalleIA.push(new tra_DetalleIA(numItem + 1, ent.codigo, ent.articulo,
      ent.unidad, ent.lote, ent.cantidad, ent.protocolo, ent.bultos, ent.costo,
      ent.nanalisis, ent.procedencia, ent.paisori, ent.glosa));
    console.log(this.eDetalleIA);
  }


  DeleteItemDetallesIA(item: number) {
    this.eDetalleIA = this.eDetalleIA.filter(listadata => {
      return listadata.item != item
    });

    let i: number = 1;
    this.eDetalleIA.forEach(element => {
      element.item = i; i++;
    });

  }

}
