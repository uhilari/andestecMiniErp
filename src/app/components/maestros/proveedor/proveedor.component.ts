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

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_PROVIDER': new FormControl('', Validators.required),
      'DESCRIPTION_PROVIDER': new FormControl('', Validators.required),
      'DOCUMENT_TYPE_PROVIDER': new FormControl("6", Validators.required),
      'NUMBER_DOCUMENT': new FormControl('', Validators.required),
      'COMMERCIAL_TYPE': new FormControl(''),
      'PROVIDER_TYPE': new FormControl(''),
      'CONTACT': new FormControl(''),
      'MOVIL_CONTACT': new FormControl(''),
      'EMAIL': new FormControl(''),
      'ISTATUS': new FormControl(''),
    });

    //cargamos los documentos de cliente dni, ruc
    this.eDocumentosP = this.maestroSevicio.geteTipDocPers();

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eProveedor = this.maestroSevicio.getProveedor(this.id);
        this.forma.setValue({

          'ID_PROVIDER': this.eProveedor.ID_PROVIDER,
          'DESCRIPTION_PROVIDER': this.eProveedor.DESCRIPTION_PROVIDER,
          'DOCUMENT_TYPE_PROVIDER': this.eProveedor.DOCUMENT_TYPE_PROVIDER,
          'NUMBER_DOCUMENT': this.eProveedor.NUMBER_DOCUMENT,
          'COMMERCIAL_TYPE': this.eProveedor.COMMERCIAL_TYPE,
          'PROVIDER_TYPE': this.eProveedor.PROVIDER_TYPE,          
          'CONTACT': this.eProveedor.CONTACT,
          'MOVIL_CONTACT': this.eProveedor.MOVIL_CONTACT,
          'EMAIL': this.eProveedor.EMAIL,
          'ISTATUS': this.eProveedor.ISTATUS,          
        });
      }
    });

  }



}
