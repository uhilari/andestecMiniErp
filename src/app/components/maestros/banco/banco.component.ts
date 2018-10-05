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
          .subscribe((res: EMA_BANK) => {
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

    this._ms.nuevoBanco(this.eBanco);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 2000);
  }


  ngOnInit() {
  }

}
