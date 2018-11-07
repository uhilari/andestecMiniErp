import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_TYPEPROVIDER } from '../../shared/modelos/MA_TYPEPROVIDER';

@Component({
  selector: 'app-tipoproveedor',
  templateUrl: './tipoproveedor.component.html',
  styles: []
})
export class TipoproveedorComponent implements OnInit {
  forma: FormGroup;
  eTipoProveedor: MA_TYPEPROVIDER;
  bol_nuevo: boolean = false;
  id: string = "";
  cargando: boolean = false;
  bol_msj: boolean = false;

  constructor(
    private maestroSevicio: MaestrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.forma = new FormGroup({
      'TP_ID': new FormControl('', Validators.required),
      'TP_DES': new FormControl('', Validators.required),
      'TP_ISTATUS': new FormControl('A', Validators.required)
    });
    
    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        
        this.maestroSevicio.getTipoProveedor(this.id)
          .subscribe((res: MA_TYPEPROVIDER) => {
            this.forma.get('TP_ID').setValue(res.TP_ID);
            this.forma.get('TP_DES').setValue(res.TP_DES)
            this.forma.get('TP_ISTATUS').setValue(res.TP_ISTATUS)
          });
      }
    })

  }

  guardarCambios() {
    this.cargando = true;
    this.eTipoProveedor = new MA_TYPEPROVIDER(
      this.forma.get('TP_ID').value,
      this.forma.get('TP_DES').value,
      this.forma.get('TP_ISTATUS').value, 1);

    this.maestroSevicio.nuevoTipoProveedor(this.eTipoProveedor);
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
