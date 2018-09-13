import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_TipDocPer } from '../../shared/modelos/Ma_TipDocPer';
import { Ma_Provider } from '../../shared/modelos/Ma_Provider';



@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class ProveedorComponent {

  forma: FormGroup;
  eProveedor: Ma_Provider;
  eDocumentosP: Ma_TipDocPer[];
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_PROVIDER': new FormControl('0', Validators.required),
      'DESCRIPTION_PROVIDER': new FormControl('', Validators.required),
      'DOCUMENT_TYPE_PROVIDER': new FormControl("6", Validators.required),
      'NUMBER_DOCUMENT': new FormControl('', Validators.required),
      'COMMERCIAL_TYPE': new FormControl(''),
      'PROVIDER_TYPE': new FormControl(''),
      'CONTACT': new FormControl(''),
      'MOVIL_CONTACT': new FormControl(''),
      'EMAIL': new FormControl(''),
      'ISTATUS': new FormControl('1'),
    });

    //cargamos los documentos de cliente dni, ruc
    this.eDocumentosP = this.maestroSevicio.geteTipDocPers();

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getProveedor(parseInt(this.id))
          .subscribe((res: Ma_Provider) => {
            this.forma.get('ID_PROVIDER').setValue(res.ID_PROVIDER);
            this.forma.get('DESCRIPTION_PROVIDER').setValue(res.DESCRIPTION_PROVIDER);
            this.forma.get('DOCUMENT_TYPE_PROVIDER').setValue(res.DOCUMENT_TYPE_PROVIDER)
            this.forma.get('NUMBER_DOCUMENT').setValue(res.NUMBER_DOCUMENT)
            this.forma.get('COMMERCIAL_TYPE').setValue(res.COMMERCIAL_TYPE)
            this.forma.get('PROVIDER_TYPE').setValue(res.PROVIDER_TYPE)
            this.forma.get('CONTACT').setValue(res.CONTACT)
            this.forma.get('MOVIL_CONTACT').setValue(res.MOVIL_CONTACT)
            this.forma.get('EMAIL').setValue(res.EMAIL)
            this.forma.get('ISTATUS').setValue(res.ISTATUS)
          });
      }
    });

  }


  guardarCambios() {
    this.cargando = true;
    let fechaReg = this.maestroSevicio.getFechaActual();

    let eProveedor = new Ma_Provider(
      this.forma.get('ID_PROVIDER').value, 1,
      this.forma.get('DESCRIPTION_PROVIDER').value,
      this.forma.get('DOCUMENT_TYPE_PROVIDER').value,
      this.forma.get('NUMBER_DOCUMENT').value,
      this.forma.get('COMMERCIAL_TYPE').value,
      this.forma.get('PROVIDER_TYPE').value,
      this.forma.get('CONTACT').value,
      this.forma.get('MOVIL_CONTACT').value,
      this.forma.get('EMAIL').value,
      this.forma.get('ISTATUS').value,
      "", fechaReg, "", "");

    this.maestroSevicio.nuevoProveedor(eProveedor);
    this.cargando = false;
    this.bol_msj = true;

    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }



}
