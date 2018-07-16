import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Article } from '../../shared/modelos/Ma_Article';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class ArticuloComponent {
  forma: FormGroup;
  eArticulo: Ma_Article;
  bol_nuevo: boolean = false;
  id: string = "";

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl(''),
      'ID_ARTICLE': new FormControl('', Validators.required),
      'ID_COMMODITY_TYPE': new FormControl('', Validators.required),
      'ID_UNIT': new FormControl('', Validators.required),
      'ID_FAMILY': new FormControl(''),
      'ID_FAMILY_SUB': new FormControl(''),
      'SKU_ARTICLE': new FormControl(''),
      'DESCRIPTION_ARTICLE': new FormControl('', Validators.required),
      'COMMERCIAL_NAME': new FormControl(''),
      'TECHNICAL_NAME': new FormControl(''),
      'SIZE': new FormControl(''),
      'COLORS': new FormControl(''),
      'BRAND': new FormControl(''),
      'MODEL': new FormControl(''),
      'AIMAGE': new FormControl(''),
      'DATA_SHEET': new FormControl('')
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eArticulo = this.maestroSevicio.getArticulo(this.id);
        this.forma.setValue({
          'ID_COMPANY': this.eArticulo.ID_COMPANY,
          'ID_ARTICLE': this.eArticulo.ID_ARTICLE,
          'ID_COMMODITY_TYPE': this.eArticulo.ID_COMMODITY_TYPE,
          'ID_UNIT': this.eArticulo.ID_UNIT,
          'ID_FAMILY': this.eArticulo.ID_FAMILY,
          'ID_FAMILY_SUB': this.eArticulo.ID_FAMILY_SUB,
          'SKU_ARTICLE': this.eArticulo.SKU_ARTICLE,
          'DESCRIPTION_ARTICLE': this.eArticulo.DESCRIPTION_ARTICLE,
          'COMMERCIAL_NAME': this.eArticulo.COMMERCIAL_NAME,
          'TECHNICAL_NAME': this.eArticulo.TECHNICAL_NAME,
          'SIZE': this.eArticulo.SIZE,
          'COLORS': this.eArticulo.COLORS,
          'BRAND': this.eArticulo.BRAND,
          'MODEL': this.eArticulo.MODEL,
          'AIMAGE': this.eArticulo.AIMAGE,
          'DATA_SHEET': this.eArticulo.DATA_SHEET
        });
      }
    })
  }

  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eArticulo = new Ma_Article(
        this.forma.get('ID_ARTICLE').value, 1,
        this.forma.get('ID_COMMODITY_TYPE').value,
        this.forma.get('ID_UNIT').value,
        this.forma.get('ID_FAMILY').value,
        this.forma.get('ID_FAMILY_SUB').value,
        this.forma.get('SKU_ARTICLE').value,
        this.forma.get('DESCRIPTION_ARTICLE').value,
        this.forma.get('COMMERCIAL_NAME').value,
        this.forma.get('TECHNICAL_NAME').value,
        this.forma.get('SIZE').value,
        this.forma.get('COLORS').value,
        this.forma.get('BRAND').value,
        this.forma.get('MODEL').value,
        this.forma.get('AIMAGE').value,
        this.forma.get('DATA_SHEET').value, "", "", "", ""
      );

      this.maestroSevicio.nuevoArticulo(this.eArticulo);
      this.router.navigate(['/articulos'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }

  }




}
