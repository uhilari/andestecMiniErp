import { Component } from '@angular/core';
// import * as XLSX from 'ts-xlsx';

import * as XLSX from 'xlsx'
import { Ma_Family } from '../shared/modelos/MA_FAMILY';
import { Ma_Family_Sub } from '../shared/modelos/Ma_Family_Sub';
import { Ma_Article } from '../shared/modelos/Ma_Article';
import { EMA_SELLER } from '../shared/modelos/EMA_SELLER';
import { Ma_Customer } from '../shared/modelos/Ma_Customer';

// const { read, utils: { sheet_to_json } } = XLSX;

@Component({
  selector: 'app-importador',
  templateUrl: './importador.component.html',
  styles: []
})
export class ImportadorComponent {

  arrayBuffer: any;
  file: File;

  eFamilia: Ma_Family[] = [];
  eFamiliaSub: Ma_Family_Sub[] = [];
  eArticulo: Ma_Article[] = [];
  eVendedores: EMA_SELLER[] = [];
  eClientes: Ma_Customer[] = [];

  constructor() { }



  //  readFirstSheet(data: any, options: XLSX.ParsingOptions): any[][] {
  //   const wb: XLSX.WorkBook = read(data, options);
  //   const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
  //   return sheet_to_json(ws, { header: 1, raw: true });
  // }



  incomingfile(event) {
    this.file = event.target.files[0];
  }


  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      //console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      let familiastmp: any = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(familiastmp);

      familiastmp.forEach(element => {
        this.eFamilia.push(new Ma_Family(1, element.CODIGO, element.DESCRIPCION))
      });

      first_sheet_name = workbook.SheetNames[1];
      worksheet = workbook.Sheets[first_sheet_name];
      let subfamiliastmp: any = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      subfamiliastmp.forEach(element => {
        this.eFamiliaSub.push(new Ma_Family_Sub(1, element.FAMILIA, element.SUBFAMILIA, element.DESCRIPCION))
      });


      first_sheet_name = workbook.SheetNames[2];
      worksheet = workbook.Sheets[first_sheet_name];
      let articulostmp: any = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      articulostmp.forEach(ele => {
        this.eArticulo.push(new Ma_Article(0, 1, '', ele.UNIDAD, ele.FAMILIA, ele.SUBFAMILIA, '0', ele.DESCRIPCION, ele.DESCRIPCION, ele.DESCRIPCION,
          '', '', '', '', '', '', '', '', '', '', 'A', 'A', ele.CODIGO, ele.EAN, ''))
      });


      first_sheet_name = workbook.SheetNames[3];
      worksheet = workbook.Sheets[first_sheet_name];
      let vendedortmp: any = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      vendedortmp.forEach(ele => {
        this.eVendedores.push(new EMA_SELLER(ele.CODIGO, ele.NOMBRE, 1, ele.DNI, '', '', ele.CORREO, 'A'))
      });


      first_sheet_name = workbook.SheetNames[4];
      worksheet = workbook.Sheets[first_sheet_name];
      let clientestmp: any = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      clientestmp.forEach(ele => {
        this.eClientes.push(new Ma_Customer(0, 1, ele.RAZONSOCIAL, ele.TIPODOCUMENTO, ele.CODIGO, 
          ele.DIRECCIONFISCAL, ele.DIRECCIONDEENTREGA, '', '', '', 
          ele.CONDICIONDEVENTA, 0, 0, '', '', '', 1, ele.CODIGOVENDEDOR  , '', '', '', ''))
      });



    }
    fileReader.readAsArrayBuffer(this.file);
  }


}