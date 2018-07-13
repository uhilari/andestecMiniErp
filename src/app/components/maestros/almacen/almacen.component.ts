import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ma_Warehouse } from '../../shared/modelos/Ma_Warehouse';
import { MaestrosService } from '../../../services/maestros.service';



@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`

  ]
})
export class AlmacenComponent {

  eAlmacen: Ma_Warehouse;
  nuevo: boolean = false;
  id: string = "";


  constructor(private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute) {
    //aqui obtenemos el usuario en caso sea modificacion
    // this.eAlmacen = new Ma_Warehouse(1, "piezas nuevas", "Lurigancho", 1);
    this.eAlmacen = new Ma_Warehouse(null, null, null, 1);

    route.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.eAlmacen = this.maestroSevicio.getAlmacen(this.id);
        console.log("codigo a editar", this.id);

        //this.maestroSevicio.getAlmacen(this.id).subscribe(data => this.almacen = data)
      }
    })
  }


  guardar(forma: NgForm) {

    //validamos con el ngForm
    console.log("forma", forma);
    console.log("Valor de la forma", forma.value);
    console.log("valor de la entidad", this.eAlmacen);

    //guardamos enviando la entidad al api por http
    let par: string = "";
    console.log(this.eAlmacen);
    if (this.id == "nuevo") {
      console.log("insertando")
      this.maestroSevicio.nuevoAlmacen(this.eAlmacen);
      console.log("termino de insertar")
      this.router.navigate(['/almacenes'])
      // .subscribe(data => {par = data['name'];                
      //   console.log("insertando")                
      //   console.log(data)                
      //   console.log(data['name'])                
      //   this.router.navigate(['/almacen', par]);              
    } else {
      //Editamos los datos con el put del api
      console.log("editando los datos");

    }

  }

 



}
