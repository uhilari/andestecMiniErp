import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ma_Center_Cost } from '../../shared/modelos/Ma_Center_Cost';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-centrocosto',
  templateUrl: './centrocosto.component.html',
  styles: []
})

export class CentrocostoComponent {
  forma: FormGroup;
  eCentrocosto: Ma_Center_Cost;
  bol_nuevo: boolean = false;
  id: string = "";

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    //creamos el form y lo enlazamos   
    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl('', Validators.required),
      'ID_CENTER_COST': new FormControl('', Validators.required),
      'DESCRIPTION_CENTER_COST': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eCentrocosto = this.maestroSevicio.getCentrocosto(this.id);
        this.forma.setValue({
          'ID_COMPANY': this.eCentrocosto.ID_COMPANY,
          'ID_CENTER_COST': this.eCentrocosto.ID_CENTER_COST,
          'DESCRIPTION_CENTER_COST': this.eCentrocosto.DESCRIPTION_CENTER_COST
        });
      }
    })
  }

  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eCentrocosto = new Ma_Center_Cost(1,
        this.forma.get('ID_CENTER_COST').value,
        this.forma.get('DESCRIPTION_CENTER_COST').value);

      this.maestroSevicio.nuevoCentrocosto(this.eCentrocosto);
      this.router.navigate(['/centrocostos'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }
  }




}
