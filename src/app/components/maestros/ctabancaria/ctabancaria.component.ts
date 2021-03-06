import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_BANKACCOUNT } from '../../shared/modelos/ECA_BANKACCOUNT';
import { EMA_BANK } from '../../shared/modelos/EMA_BANK';
import { Ma_Moneda } from '../../shared/modelos/Ma_Moneda';
declare var swal: any;

@Component({
  selector: 'app-ctabancaria',
  templateUrl: './ctabancaria.component.html',
  styles: []
})
export class CtabancariaComponent implements OnInit {

  eCtacte: ECA_BANKACCOUNT;
  eBancos: EMA_BANK[];
  eMonedas: Ma_Moneda[];
  forma: FormGroup;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  bol_error: boolean;
  msj_error: string;
  msj_ok: string;


  constructor(
    private _ms: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    this.forma = new FormGroup({
      'AB_ID': new FormControl({ value: '0', disabled: true }, Validators.required),
      'AB_IDBANKACCOUNT': new FormControl('', Validators.required),
      'AB_IDBANK': new FormControl('', Validators.required),
      'AB_CURRENCY': new FormControl('', Validators.required),
      'AB_DESCRIPTION': new FormControl('', Validators.required)
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this._ms.getCuentaBancaria(this.id)
          .then((res: ECA_BANKACCOUNT) => {
            this.forma.get('AB_ID').setValue(res.AB_ID);
            this.forma.get('AB_IDBANKACCOUNT').setValue(res.AB_IDBANKACCOUNT)
            this.forma.get('AB_IDBANK').setValue(res.AB_IDBANK)
            this.forma.get('AB_CURRENCY').setValue(res.AB_CURRENCY);
            this.forma.get('AB_DESCRIPTION').setValue(res.AB_DESCRIPTION)
          })
      }

    });

    //cargamos combos
    this._ms.getBancos().then((dat: EMA_BANK[]) => this.eBancos = dat);
    this.eMonedas = this._ms.getMonedas();
  }

  guardarCambios() {
    this.cargando = true;
    this.eCtacte = new ECA_BANKACCOUNT(
      this.forma.get('AB_ID').value,
      this.forma.get('AB_IDBANKACCOUNT').value,
      this.forma.get('AB_IDBANK').value,
      this.forma.get('AB_CURRENCY').value,
      this.forma.get('AB_DESCRIPTION').value,
      1);

    this._ms.nuevaCuentaBancaria(this.eCtacte).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo el tipo de transaccion de caja correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/ctactes']);
          }, 1500);
        }
      }
    ).catch(err => swal({ title: "Error", text: err, icon: "success", dangerMode: true }));

  }

  ngOnInit() {
  }

}
