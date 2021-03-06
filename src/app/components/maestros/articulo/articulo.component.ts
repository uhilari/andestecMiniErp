import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Article } from '../../shared/modelos/Ma_Article';
import { Ma_Unit } from '../../shared/modelos/Ma_Unit';
import { Ma_Family } from '../../shared/modelos/MA_FAMILY';
import { Ma_Family_Sub } from '../../shared/modelos/Ma_Family_Sub';
import { Ma_Commodity_Type } from '../../shared/modelos/Ma_Commodity_Type';


import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class ArticuloComponent {
  forma: FormGroup;
  eArticulo: Ma_Article;
  eUnidades: Ma_Unit[];
  eFamilias: Ma_Family[];
  eSubFamilias: Ma_Family_Sub[];
  eTipoMercaderia: Ma_Commodity_Type[];
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  bol_error: boolean;
  msj_error: string;
  msj_ok: string;

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl(''),
      'ID_ARTICLE': new FormControl('0', Validators.required),
      'ID_COMMODITY_TYPE': new FormControl('10', Validators.required),
      'ID_UNIT': new FormControl('UN', Validators.required),
      'ID_FAMILY': new FormControl('9'),
      'ID_FAMILY_SUB': new FormControl('901'),
      'SKU_ARTICLE': new FormControl('1'),
      'DESCRIPTION_ARTICLE': new FormControl('', Validators.required),
      'COMMERCIAL_NAME': new FormControl(''),
      'TECHNICAL_NAME': new FormControl(''),
      'SIZE': new FormControl(''),
      'COLORS': new FormControl(''),
      'BRAND': new FormControl(''),
      'MODEL': new FormControl(''),
      'AIMAGE': new FormControl(''),
      'DATA_SHEET': new FormControl(''),
      'AISSERVICE': new FormControl('A'),
      'ISTATUS': new FormControl('A'),
      'COD_ALT': new FormControl('', [Validators.required, Validators.maxLength(10)]),
      'COD_EAN': new FormControl('', Validators.maxLength(10)),
      'COD_SUNAT': new FormControl('', Validators.maxLength(10)),
      'IVA': new FormControl('0')
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getArticulo(parseInt(this.id))
          .subscribe((res: Ma_Article) => {
            this.forma.get('ID_ARTICLE').setValue(res.ID_ARTICLE);
            this.forma.get('ID_COMMODITY_TYPE').setValue(res.ID_COMMODITY_TYPE);
            this.forma.get('ID_UNIT').setValue(res.ID_UNIT);
            this.forma.get('ID_FAMILY').setValue(res.ID_FAMILY);
            this.forma.get('ID_FAMILY_SUB').setValue(res.ID_FAMILY_SUB);
            this.forma.get('SKU_ARTICLE').setValue(res.SKU_ARTICLE);
            this.forma.get('DESCRIPTION_ARTICLE').setValue(res.DESCRIPTION_ARTICLE);
            this.forma.get('COMMERCIAL_NAME').setValue(res.COMMERCIAL_NAME);
            this.forma.get('TECHNICAL_NAME').setValue(res.TECHNICAL_NAME);
            this.forma.get('SIZE').setValue(res.SIZE);
            this.forma.get('COLORS').setValue(res.COLORS);
            this.forma.get('BRAND').setValue(res.BRAND);
            this.forma.get('MODEL').setValue(res.MODEL);
            this.forma.get('AIMAGE').setValue(res.AIMAGE);
            this.forma.get('DATA_SHEET').setValue(res.DATA_SHEET);
            this.forma.get('AISSERVICE').setValue(res.AISSERVICE);
            this.forma.get('ISTATUS').setValue(res.ISTATUS);

            this.forma.get('COD_ALT').setValue(res.COD_ALT);
            this.forma.get('COD_EAN').setValue(res.COD_EAN);
            this.forma.get('COD_SUNAT').setValue(res.COD_SUNAT);
            this.forma.get('IVA').setValue(res.IVA);
          });
      }
    })


    maestroSevicio.getUnidades().then((data: Ma_Unit[]) => this.eUnidades = data);
    maestroSevicio.getFamilias().then((data: Ma_Family[]) => this.eFamilias = data);
    maestroSevicio.getFamiliasSub().then((data: Ma_Family_Sub[]) => this.eSubFamilias = data);
    maestroSevicio.getCommoditys().then((data: Ma_Commodity_Type[]) => this.eTipoMercaderia = data);


  }

  cambioFamilia(idfamilia: any) {

    this.maestroSevicio.getFamiliaSubxFam(idfamilia).then(
      (res: Ma_Family_Sub[]) => {
        this.eSubFamilias = res;
      }
    );
  }




  guardarCambios() {

    this.cargando = true;
    let fechaReg = this.maestroSevicio.getFechaActual();

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
      this.forma.get('DATA_SHEET').value, "", fechaReg, "", "",
      this.forma.get('AISSERVICE').value,
      this.forma.get('ISTATUS').value,
      this.forma.get('COD_ALT').value,
      this.forma.get('COD_EAN').value,
      this.forma.get('COD_SUNAT').value,
      this.forma.get('IVA').value
    );

    this.maestroSevicio.registrarArticulo(this.eArticulo).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo el articulo correctamente";

          setTimeout(() => {
            this.bol_msj = false;
            this.forma.reset();
            this.router.navigate(['/articulos']);
          }, 1500);
        }

      }
    ).catch(error => this.ShowError(error));


  }


  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  copiartexto() {
    this.forma.get('COMMERCIAL_NAME').setValue(this.forma.get('DESCRIPTION_ARTICLE').value)
    this.forma.get('TECHNICAL_NAME').setValue(this.forma.get('DESCRIPTION_ARTICLE').value)
  }

  scrollToTop(el) {
    const duration = 600;
    const interval = 5;
    const move = el.scrollTop * interval / duration;
    observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, el.scrollTop),
      tap(position => el.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }

}
