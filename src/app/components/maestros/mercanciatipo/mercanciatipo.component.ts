import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Commodity_Type } from '../../shared/modelos/Ma_Commodity_Type';

@Component({
  selector: 'app-mercanciatipo',
  templateUrl: './mercanciatipo.component.html',
  styles: []
})
export class MercanciatipoComponent {
  forma: FormGroup;
  eCommodity: Ma_Commodity_Type;
  bol_nuevo: boolean = false;
  id: string = "";

  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'ID_COMPANY': new FormControl('', Validators.required),
      'ID_COMMODITY_TYPE': new FormControl('', Validators.required),
      'DESCRIPTION_COMMODITY': new FormControl('', Validators.required),
    });

    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        console.log("codigo a editar", this.id);
        this.eCommodity = this.maestroSevicio.getCommodity(this.id);
        this.forma.setValue({
          'ID_COMPANY': this.eCommodity.ID_COMPANY,
          'ID_COMMODITY_TYPE': this.eCommodity.ID_COMMODITY_TYPE,
          'DESCRIPTION_COMMODITY': this.eCommodity.DESCRIPTION_COMMODITY
        });
      }
    })

  }

  guardarCambios() {
    //console.log(this.forma.value);    
    if (this.id == "nuevo") {
      console.log("insertando")
      this.eCommodity = new Ma_Commodity_Type(1,        
        this.forma.get('ID_COMMODITY_TYPE').value,
        this.forma.get('DESCRIPTION_COMMODITY').value);

      this.maestroSevicio.nuevoCommodity(this.eCommodity);
      this.router.navigate(['/mercanciatipos'])
      //this.forma.reset();
    } else {
      console.log("Editando los datos..... esperando servicio API.....");
    }

  }


}
