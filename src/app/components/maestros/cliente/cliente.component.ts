import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { Ma_TipDocPer } from '../../shared/modelos/Ma_TipDocPer';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class ClienteComponent {

  forma: FormGroup;
  eCliente: Ma_Customer;
  eDocumentosP: Ma_TipDocPer[];
  bol_nuevo: boolean = false;
  id: string = "";

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    this.forma = new FormGroup({
      'ID_CUSTOMER': new FormControl('', Validators.required),
      'DESCRIPTION_CUSTOMER': new FormControl('', Validators.required),
      'DOCUMENT_TYPE_CUSTOMER': new FormControl("6", Validators.required),
      'NUMBER_DOCUMENT': new FormControl('', Validators.required),
      'NIF_ADDRESS': new FormControl(''),
      'DELIVERY_ADDRESS': new FormControl(''),
      'COMMERCIAL_TYPE': new FormControl(''),
      'CUSTOMER_TYPE': new FormControl(''),
      'PRICE_TYPE': new FormControl(''),
      'SALES': new FormControl(''),
      'CREDIT_LIMIT_LOCAL': new FormControl(''),
      'CREDIT_LIMIT_USD': new FormControl(''),
      'CONTACT': new FormControl(''),
      'MOVIL_CONTACT': new FormControl(''),
      'EMAIL': new FormControl(''),
      'ISTATUS': new FormControl(''),
      'SALES_CODE': new FormControl('')
    });

    //cargamos los documentos de cliente dni, ruc
    this.eDocumentosP = this.maestroSevicio.geteTipDocPers();



    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eCliente = this.maestroSevicio.getCliente(this.id);
        this.forma.setValue({

          'ID_CUSTOMER': this.eCliente.ID_CUSTOMER,
          'DESCRIPTION_CUSTOMER': this.eCliente.DESCRIPTION_CUSTOMER,
          'DOCUMENT_TYPE_CUSTOMER': this.eCliente.DOCUMENT_TYPE_CUSTOMER,
          'NUMBER_DOCUMENT': this.eCliente.NUMBER_DOCUMENT,
          'NIF_ADDRESS': this.eCliente.NIF_ADDRESS,
          'DELIVERY_ADDRESS': this.eCliente.DELIVERY_ADDRESS,
          'COMMERCIAL_TYPE': this.eCliente.COMMERCIAL_TYPE,
          'CUSTOMER_TYPE': this.eCliente.CUSTOMER_TYPE,
          'PRICE_TYPE': this.eCliente.PRICE_TYPE,
          'SALES': this.eCliente.SALES,
          'CREDIT_LIMIT_LOCAL': this.eCliente.CREDIT_LIMIT_LOCAL,
          'CREDIT_LIMIT_USD': this.eCliente.CREDIT_LIMIT_USD,
          'CONTACT': this.eCliente.CONTACT,
          'MOVIL_CONTACT': this.eCliente.MOVIL_CONTACT,
          'EMAIL': this.eCliente.EMAIL,
          'ISTATUS': this.eCliente.ISTATUS,
          'SALES_CODE': this.eCliente.SALES_CODE
        });
      }
    });

  }


  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eCliente = new Ma_Customer(
        this.forma.get('ID_CUSTOMER').value, 1,
        this.forma.get('DESCRIPTION_CUSTOMER').value,
        this.forma.get('DOCUMENT_TYPE_CUSTOMER').value,
        this.forma.get('NUMBER_DOCUMENT').value,
        this.forma.get('NIF_ADDRESS').value,
        this.forma.get('DELIVERY_ADDRESS').value,
        this.forma.get('COMMERCIAL_TYPE').value,
        this.forma.get('CUSTOMER_TYPE').value,
        this.forma.get('PRICE_TYPE').value,
        this.forma.get('SALES').value,
        this.forma.get('CREDIT_LIMIT_LOCAL').value,
        this.forma.get('CREDIT_LIMIT_USD').value,
        this.forma.get('CONTACT').value,
        this.forma.get('MOVIL_CONTACT').value,
        this.forma.get('EMAIL').value,
        this.forma.get('ISTATUS').value,
        this.forma.get('SALES_CODE').value, "", "", "", "");


      this.maestroSevicio.nuevoCliente(this.eCliente);
      this.router.navigate(['/clientes'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }

  }
}
