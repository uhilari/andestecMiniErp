import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Seg_Usuario } from '../../shared/modelos/SEG_Usuario';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`

  ]
})
export class UsuarioComponent implements OnInit {
  forma: FormGroup;
  nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;
  msj_ok: string;
  bol_error: boolean;
  msj_error: string;

  constructor(private seguridadSevicio: SeguridadService,
    private router: Router,
    private route: ActivatedRoute) {

      this.forma = new FormGroup({
        'ID_Usuario': new FormControl(''),
        'Nick': new FormControl('', Validators.required),
        'Nombre': new FormControl('', Validators.required),
        'Clave': new FormControl('', Validators.required),
        'Perfil': new FormControl('A'),
        'Email': new FormControl(''),
      });      
  }

  public ngOnInit() {

    //aqui obtenemos el usuario en caso sea modificacion
    this.route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.forma.get('Clave').clearValidators();
        this.seguridadSevicio.getUsuario(this.id)
          .subscribe(r => {
            this.forma.get('ID_Usuario').setValue(r.id);
            this.forma.get('Nick').setValue(r.nick);
            this.forma.get('Nombre').setValue(r.nombre);
            this.forma.get('Clave').setValue(r.clave);
            this.forma.get('Email').setValue(r.email);
            this.forma.get('Perfil').setValue(r.esAdmin ? 'A' : 'U');
          });
      }
      else {
        this.forma.get('Clave').setValidators([Validators.required]);
      }
    });
  }

  guardar() {
    this.cargando = true;
    let eUsuario: Seg_Usuario = {
      id: this.forma.get("ID_Usuario").value,
      nick: this.forma.get("Nick").value,
      nombre: this.forma.get("Nombre").value,
      clave: this.forma.get("Clave").value,
      esAdmin: this.forma.get('Perfil').value === 'A',
      email: this.forma.get("Email").value
    };

    this.seguridadSevicio.grabarUsuario(eUsuario)
      .subscribe(res =>{
        if (res === "ok") {
          this.forma.reset();
          //this.router.navigate(['/almacenes'])
          this.cargando = false;
          this.bol_msj = true;
          this.msj_ok = "Se grabo el articulo correctamente";

          setTimeout(() => {
            this.bol_msj = false;
            this.router.navigate(['/usuarios']);
          }, 1500);
        }
      }, error => this.ShowError(error));

  }


  ShowError(err: any) {
    this.cargando = false;
    this.bol_error = true;
    this.msj_error = err.message;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

}
