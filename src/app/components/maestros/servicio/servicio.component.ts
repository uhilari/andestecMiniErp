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

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl('', Validators.required),
      'ID_SERVICES': new FormControl('', Validators.required),
      'DESCRIPTION_SERVICES': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eServicio = this.maestroSevicio.getServicio(this.id);
        this.forma.setValue({
          'ID_COMPANY': this.eServicio.ID_COMPANY,
          'ID_SERVICES': this.eServicio.ID_SERVICES,
          'DESCRIPTION_SERVICES': this.eServicio.DESCRIPTION_SERVICES
        });
      }
    })
  }




  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eServicio = new Ma_Service(1,
        this.forma.get('ID_SERVICES').value,
        this.forma.get('DESCRIPTION_SERVICES').value);

      this.maestroSevicio.nuevoServicio(this.eServicio);
      this.router.navigate(['/servicios'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }

  }
}
