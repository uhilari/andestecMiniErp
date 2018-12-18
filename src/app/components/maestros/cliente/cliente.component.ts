import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { Ma_TipDocPer } from '../../shared/modelos/Ma_TipDocPer';
import { MA_TYPECUSTOMER } from '../../shared/modelos/MA_TYPECUSTOMER';
import { MA_TYPECOMMERCE } from '../../shared/modelos/MA_TYPECOMMERCE';
import { MA_TYPEPRICE } from '../../shared/modelos/MA_TYPEPRICE';
import { EMA_SELLER } from '../../shared/modelos/EMA_SELLER';
import { MA_PAYMENTTYPE } from '../../shared/modelos/MA_PAYMENTTYPE';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class ClienteComponent {

  forma: FormGroup;
  eCliente: Ma_Customer;
  eDocumentosP: Ma_TipDocPer[];
  eTipoCliente: MA_TYPECUSTOMER[];
  eTipoComercio: MA_TYPECOMMERCE[];
  eTipoPrecio: MA_TYPEPRICE[];
  eVendedor: EMA_SELLER[];
  eFormaPago: MA_PAYMENTTYPE[];
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  msj_ok: string;
  bol_error: boolean;
  msj_error: string;

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
      'IDPAYMENTYPE': new FormControl(''),
      'CREDIT_LIMIT_LOCAL': new FormControl(''),
      'CREDIT_LIMIT_USD': new FormControl(''),
      'CONTACT': new FormControl(''),
      'MOVIL_CONTACT': new FormControl(''),
      'EMAIL': new FormControl(''),
      'ISTATUS': new FormControl('1'),
      'SALES_CODE': new FormControl('')
    });

    //cargamos los documentos de cliente dni, ruc
    this.eDocumentosP = this.maestroSevicio.geteTipDocPers();

    this.maestroSevicio.getTipoComercios().subscribe(
      (data: MA_TYPECOMMERCE[]) => this.eTipoComercio = data);

    this.maestroSevicio.getTipoClientes().subscribe(
      (data: MA_TYPECUSTOMER[]) => this.eTipoCliente = data);

    this.maestroSevicio.getTipoPrecios().subscribe(
      (data: MA_TYPEPRICE[]) => this.eTipoPrecio = data);

    this.maestroSevicio.getVendedores().subscribe(
      (data: EMA_SELLER[]) => this.eVendedor = data);

    this.maestroSevicio.getFormaPagos().subscribe(
      (dat: MA_PAYMENTTYPE[]) => this.eFormaPago = dat);




    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getCliente(parseInt(this.id))
          .subscribe((res: Ma_Customer) => {
            this.forma.get('ID_CUSTOMER').setValue(res.ID_CUSTOMER);
            this.forma.get('DESCRIPTION_CUSTOMER').setValue(res.DESCRIPTION_CUSTOMER);
            this.forma.get('DOCUMENT_TYPE_CUSTOMER').setValue(res.DOCUMENT_TYPE_CUSTOMER)
            this.forma.get('NUMBER_DOCUMENT').setValue(res.NUMBER_DOCUMENT)
            this.forma.get('NIF_ADDRESS').setValue(res.NIF_ADDRESS)
            this.forma.get('DELIVERY_ADDRESS').setValue(res.DELIVERY_ADDRESS)
            this.forma.get('COMMERCIAL_TYPE').setValue(res.COMMERCIAL_TYPE)
            this.forma.get('CUSTOMER_TYPE').setValue(res.CUSTOMER_TYPE)
            this.forma.get('PRICE_TYPE').setValue(res.PRICE_TYPE)
            this.forma.get('IDPAYMENTYPE').setValue(res.IDPAYMENTYPE)
            this.forma.get('CREDIT_LIMIT_LOCAL').setValue(res.CREDIT_LIMIT_LOCAL)
            this.forma.get('CREDIT_LIMIT_USD').setValue(res.CREDIT_LIMIT_USD)
            this.forma.get('CONTACT').setValue(res.CONTACT)
            this.forma.get('MOVIL_CONTACT').setValue(res.MOVIL_CONTACT)
            this.forma.get('EMAIL').setValue(res.EMAIL)
            this.forma.get('ISTATUS').setValue("1")
            if (res.ISTATUS == 1) {
              console.log('paso por aki');
              this.forma.get('ISTATUS').setValue("1")
            }

            this.forma.get('SALES_CODE').setValue(res.SALES_CODE)
            console.log('estado de cliente', res.ISTATUS);

          });

      } else { this.forma.get('ID_CUSTOMER').setValue(0); }
    });

  }


  guardarCambios() {

    this.cargando = true;
    let fechaReg = this.maestroSevicio.getFechaActual();

    this.eCliente = new Ma_Customer(
      (this.forma.get('ID_CUSTOMER').value), 1,
      this.forma.get('DESCRIPTION_CUSTOMER').value,
      this.forma.get('DOCUMENT_TYPE_CUSTOMER').value,
      this.forma.get('NUMBER_DOCUMENT').value,
      this.forma.get('NIF_ADDRESS').value,
      this.forma.get('DELIVERY_ADDRESS').value,
      this.forma.get('COMMERCIAL_TYPE').value,
      this.forma.get('CUSTOMER_TYPE').value,
      this.forma.get('PRICE_TYPE').value,
      this.forma.get('IDPAYMENTYPE').value,
      this.forma.get('CREDIT_LIMIT_LOCAL').value,
      this.forma.get('CREDIT_LIMIT_USD').value,
      this.forma.get('CONTACT').value,
      this.forma.get('MOVIL_CONTACT').value,
      this.forma.get('EMAIL').value,
      this.forma.get('ISTATUS').value,
      this.forma.get('SALES_CODE').value, "", fechaReg, "", "");

    this.maestroSevicio.nuevoCliente(this.eCliente).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo correctamente los datos.";

          setTimeout(() => {
            this.bol_msj = false;
            this.forma.reset();
            this.router.navigate(['/clientes']);
          }, 1500);
        }

      }
    ).catch(error => this.ShowError(error))
  }


  ShowError(err: string) {
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }
}
