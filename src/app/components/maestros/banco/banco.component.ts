import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { EMA_BANK } from '../../shared/modelos/EMA_BANK';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class BancoComponent implements OnInit {

  eBanco: EMA_BANK;
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
      'BA_IDBANK': new FormControl('', Validators.required),
      'BA_DESCRIPTIONS': new FormControl('', Validators.required),
      'BA_ISTATUS': new FormControl('A', Validators.required)
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this._ms.getBanco(this.id)
          .then((res: EMA_BANK) => {
            this.forma.get('BA_IDBANK').setValue(res.BA_IDBANK);
            this.forma.get('BA_DESCRIPTIONS').setValue(res.BA_DESCRIPTIONS)
            this.forma.get('BA_ISTATUS').setValue(res.BA_ISTATUS)
          })
      }

    });


  }

  guardarCambios() {
    this.cargando = true;
    this.eBanco = new EMA_BANK(
      this.forma.get('BA_IDBANK').value,
      this.forma.get('BA_DESCRIPTIONS').value,
      this.forma.get('BA_ISTATUS').value, 1);

    this._ms.nuevoBanco(this.eBanco).then(
      res => {
        if (res == "ok") {          
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok="se grabo el banco correctamente";

          setTimeout(() => {
            this.bol_msj = false;
            this.forma.reset();
            this.router.navigate(['/bancos']);
          }, 1500);
        }
      }
    );

  }


  ngOnInit() {
  }

}
