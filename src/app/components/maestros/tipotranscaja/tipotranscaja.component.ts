import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { ECA_TRANSCOLLECTION } from '../../shared/modelos/ECA_TRANSCOLLECTION';
import { Ma_Moneda } from '../../shared/modelos/Ma_Moneda';

@Component({
  selector: 'app-tipotranscaja',
  templateUrl: './tipotranscaja.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class TipotranscajaComponent implements OnInit {

  eTipo: ECA_TRANSCOLLECTION;
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
    private route: ActivatedRoute
  ) {

    this.forma = new FormGroup({
      'TC_IDTRANSCOLLECTION': new FormControl('', Validators.required),
      'TC_DESCRIPTION': new FormControl('', Validators.required),
      'TC_IDCURRENCY': new FormControl('PEN'),
      'TC_TYPECASH': new FormControl('N'),
      'TC_TYPEDEPOSIT': new FormControl('N'),
      'TC_TYPEAPPDPOC': new FormControl('N'),
      'TC_TYPEPROVIDER': new FormControl('N'),
      'TC_TYPECARD': new FormControl('N'),
      'TC_ISTATUS': new FormControl('A')
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this._ms.getTipoTransaccionCaja(this.id)
          .then((res: ECA_TRANSCOLLECTION) => {
            this.forma.get('TC_IDTRANSCOLLECTION').setValue(res.TC_IDTRANSCOLLECTION);
            this.forma.get('TC_DESCRIPTION').setValue(res.TC_DESCRIPTION)
            this.forma.get('TC_IDCURRENCY').setValue(res.TC_IDCURRENCY)
            this.forma.get('TC_TYPECASH').setValue(res.TC_TYPECASH);
            this.forma.get('TC_TYPEDEPOSIT').setValue(res.TC_TYPEDEPOSIT)
            this.forma.get('TC_TYPEAPPDPOC').setValue(res.TC_TYPEAPPDPOC)
            this.forma.get('TC_TYPEPROVIDER').setValue(res.TC_TYPEPROVIDER)
            this.forma.get('TC_TYPECARD').setValue(res.TC_TYPECARD)
            this.forma.get('TC_ISTATUS').setValue(res.TC_ISTATUS)
          })
      }
    });

    this.eMonedas = this._ms.getMonedas();

  }

  guardarCambios() {
    
    this.cargando = true;
    this.eTipo = new ECA_TRANSCOLLECTION(
      this.forma.get('TC_IDTRANSCOLLECTION').value,
      this.forma.get('TC_DESCRIPTION').value,
      this.forma.get('TC_IDCURRENCY').value,
      this.forma.get('TC_TYPECASH').value,
      this.forma.get('TC_TYPEDEPOSIT').value,
      this.forma.get('TC_TYPEAPPDPOC').value,
      this.forma.get('TC_TYPEPROVIDER').value,
      this.forma.get('TC_TYPECARD').value,
      this.forma.get('TC_ISTATUS').value,
      1);

    this._ms.nuevoTipoTransaccionCaja(this.eTipo).then(
      res => {
        if (res == "ok") {
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "se grabo el tipo de transaccion de caja correctamente";

          setTimeout(() => {
            this.forma.reset();
            this.bol_msj = false;
            this.router.navigate(['/tipotranscajas']);
          }, 1500);
        }
      }
    );
  }

  ngOnInit() {
  }

}
