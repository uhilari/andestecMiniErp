import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_Center_Cost } from '../../shared/modelos/Ma_Center_Cost';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-centrocosto',
  templateUrl: './centrocosto.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})

export class CentrocostoComponent {
  forma: FormGroup;
  eCentrocosto: Ma_Center_Cost;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj:boolean=false;

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    //creamos el form y lo enlazamos   
    this.forma = new FormGroup({      
      'ID_CENTER_COST': new FormControl('', Validators.required),
      'DESCRIPTION_CENTER_COST': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.maestroSevicio.getCentrocosto(this.id)
          .subscribe((res: Ma_Center_Cost) => {            
            this.forma.get('ID_CENTER_COST').setValue(res.ID_CENTER_COST);
            this.forma.get('DESCRIPTION_CENTER_COST').setValue(res.DESCRIPTION_CENTER_COST)
          });
      }
    })
  }

  guardarCambios() {
    this.cargando = true;

    this.eCentrocosto = new Ma_Center_Cost(1,
      this.forma.get('ID_CENTER_COST').value,
      this.forma.get('DESCRIPTION_CENTER_COST').value);

    this.maestroSevicio.nuevoCentrocosto(this.eCentrocosto);
    
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;

    setTimeout(() => {
      this.bol_msj = false;
      this.router.navigate(['/centrocostos']);
    }, 1500);
  }

}
