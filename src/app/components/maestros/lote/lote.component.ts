import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Lot } from '../../shared/modelos/Ma_Lot';
import { Ma_Article } from '../../shared/modelos/Ma_Article';

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class LoteComponent {

  forma: FormGroup;
  eLote: Ma_Lot;
  eArticulos: Ma_Article[] = [];
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  bol_error: boolean;
  msj_error: string;

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.forma = new FormGroup({
      'IDARTICLE': new FormControl('', Validators.required),
      'IDARTICLE_DES': new FormControl('', Validators.required),
      'IDLOT': new FormControl('', Validators.required),
      'DESCRIPTION': new FormControl('', Validators.required),
      'EXPEDITION_DATE': new FormControl('', Validators.required),
      'CADUCATE_DATE': new FormControl('', Validators.required),
      'COMMENT': new FormControl(''),
      'ISTATUS': new FormControl('A', Validators.required)
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.maestroSevicio.getLote(this.id)
          .subscribe((res: Ma_Lot) => {
            this.forma.get('IDARTICLE').setValue(res.IDARTICLE);
            this.forma.get('IDLOT').setValue(res.IDLOT)
            this.forma.get('DESCRIPTION').setValue(res.DESCRIPTION)
            this.forma.get('EXPEDITION_DATE').setValue(res.EXPEDITION_DATE)
            this.forma.get('CADUCATE_DATE').setValue(res.CADUCATE_DATE)
            this.forma.get('COMMENT').setValue(res.COMMENT)
            this.forma.get('ISTATUS').setValue(res.ISTATUS)

            this.maestroSevicio.getArticulo(res.IDARTICLE).subscribe((dat: Ma_Article) =>
              this.forma.get('IDARTICLE_DES').setValue(dat.DESCRIPTION_ARTICLE));
          })
      }

    });
  }

  guardarCambios() {

    this.cargando = true;

    let fecEmi = this.forma.get('EXPEDITION_DATE').value;
    let fecVto = this.forma.get('CADUCATE_DATE').value;
    fecEmi = fecEmi.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    fecVto = fecVto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');

    this.eLote = new Ma_Lot(1,
      this.forma.get('IDARTICLE').value,
      this.forma.get('IDLOT').value,
      this.forma.get('DESCRIPTION').value,
      fecEmi,
      fecVto,
      this.forma.get('COMMENT').value,
      this.forma.get('ISTATUS').value);

    this.maestroSevicio.nuevoLote(this.eLote).then(
      res => {
        if (res == "ok") {
          this.forma.reset();
          this.cargando = false;
          this.bol_msj = true;
          setTimeout(() => {
            this.bol_msj = false;
            this.router.navigate(['/lotes']);
          }, 1500);
        }
      }
    ).catch(
      error  => this.ShowError(error)
    );

  }



  HelpBuscarArticulos(patron: any) {
    this.maestroSevicio.getArticuloxNombre(patron.value)
      .subscribe((resp: Ma_Article[]) => {
        this.eArticulos = resp;
        console.log(resp);
      });
  }

  HelpCargarArticulo(idArt: number) {
    this.maestroSevicio.getArticulo(idArt)
      .subscribe((resp: Ma_Article) => {
        this.forma.controls['IDARTICLE'].setValue(resp.ID_ARTICLE);
        this.forma.controls['IDARTICLE_DES'].setValue(resp.DESCRIPTION_ARTICLE);
      });
  }


  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

}
