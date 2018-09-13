import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_DOCUMENTS } from '../../shared/modelos/MA_DOCUMENTS';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})

export class DocumentosComponent {
  forma: FormGroup;
  eDocumento: MA_DOCUMENTS;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.forma = new FormGroup({
      'ID_DOCUMENT': new FormControl('', Validators.required),
      'DOCUMENT_DESCRIPTION': new FormControl('', Validators.required),
      'ABREVIATURE': new FormControl('', Validators.required),
      'CODE_NIF': new FormControl(''),
      'CODE_ELECTRONIC': new FormControl(''),
      'ISTATUS': new FormControl('1', Validators.required)
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getDocumento(this.id)
          .subscribe((res: MA_DOCUMENTS) => {
            this.forma.get('ID_DOCUMENT').setValue(res.ID_DOCUMENT);
            this.forma.get('DOCUMENT_DESCRIPTION').setValue(res.DOCUMENT_DESCRIPTION)
            this.forma.get('ABREVIATURE').setValue(res.ABREVIATURE)
            this.forma.get('CODE_NIF').setValue(res.CODE_NIF)
            this.forma.get('CODE_ELECTRONIC').setValue(res.CODE_ELECTRONIC)
            this.forma.get('ISTATUS').setValue(res.ISTATUS)
          });
      }
    })


  }

  guardarCambios() {
    this.cargando = true;
    this.eDocumento = new MA_DOCUMENTS(
      this.forma.get('ID_DOCUMENT').value,
      this.forma.get('DOCUMENT_DESCRIPTION').value,
      this.forma.get('ABREVIATURE').value,
      this.forma.get('CODE_NIF').value,
      this.forma.get('CODE_ELECTRONIC').value,
      this.forma.get('ISTATUS').value, 1);

    this.maestroSevicio.nuevoDocumento(this.eDocumento);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }

}
