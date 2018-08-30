import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Service } from '../../shared/modelos/Ma_Service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class ServicioComponent {
  forma: FormGroup;
  eServicio: Ma_Service;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    this.forma = new FormGroup({      
      'ID_SERVICES': new FormControl('', Validators.required),
      'DESCRIPTION_SERVICES': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getServicio(this.id)
          .subscribe((res: Ma_Service) => {            
            this.forma.get('ID_SERVICES').setValue(res.ID_SERVICES);
            this.forma.get('DESCRIPTION_SERVICES').setValue(res.DESCRIPTION_SERVICES)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;
    this.eServicio = new Ma_Service(1,
      this.forma.get('ID_SERVICES').value,
      this.forma.get('DESCRIPTION_SERVICES').value);
    this.maestroSevicio.nuevoServicio(this.eServicio);
    this.forma.reset();
    this.cargando = false;
  }
}
