import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../../../services/maestros.service';
import { MA_SALESPOINT } from '../../shared/modelos/MA_SALESPOINT';
import { MA_SALPOINTSERIE } from '../../shared/modelos/MA_SALPOINTSERIE';
import { MA_DOCUMENTS } from '../../shared/modelos/MA_DOCUMENTS';


@Component({
  selector: 'app-puntoventa',
  templateUrl: './puntoventa.component.html',
  styleUrls: []
})
export class PuntoventaComponent {
  forma: FormGroup;
  frmdet: FormGroup;
  ePuntoVenta: MA_SALESPOINT;
  ePuntoSerie: MA_SALPOINTSERIE[];
  eDocumento: MA_DOCUMENTS[];
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
      'SP_ID': new FormControl('', Validators.required),
      'SP_DES': new FormControl('', Validators.required),
      'SP_ADD': new FormControl(''),
      'SP_PHONE': new FormControl(''),
      'SP_COMMENT': new FormControl(''),
      'SP_ISTATUS': new FormControl('1', Validators.required),
    });


    this.frmdet = new FormGroup({
      'SS_ID_DOCUMENT': new FormControl('', Validators.required),
      'SS_SERIE': new FormControl('', Validators.required),
      'SS_INITCORRE': new FormControl('', Validators.required),
      'SS_PRINTING_FORMAT': new FormControl('')
    });


    this.maestroSevicio.getDocumentos().subscribe(
      (dat: MA_DOCUMENTS[]) => { this.eDocumento = dat }
    );


    route.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== "nuevo") {
        this.maestroSevicio.getPuntoVenta(this.id)
          .subscribe((res: MA_SALESPOINT) => {
            this.forma.get('SP_ID').setValue(res.SP_ID);
            this.forma.get('SP_DES').setValue(res.SP_DES)
            this.forma.get('SP_ADD').setValue(res.SP_ADD)
            this.forma.get('SP_PHONE').setValue(res.SP_PHONE)
            this.forma.get('SP_COMMENT').setValue(res.SP_COMMENT)
            this.forma.get('SP_ISTATUS').setValue(res.SP_ISTATUS)

            this.maestroSevicio.getPuntoSeries(this.id).subscribe(
              (data: MA_SALPOINTSERIE[]) => { this.ePuntoSerie = data }
            );

          });
      }
    });




  }


  guardarCambios() {
    this.cargando = true;
    this.ePuntoVenta = new MA_SALESPOINT(
      this.forma.get('SP_ID').value,
      this.forma.get('SP_DES').value,
      this.forma.get('SP_ADD').value,
      this.forma.get('SP_PHONE').value,
      this.forma.get('SP_COMMENT').value,
      this.forma.get('SP_ISTATUS').value, 1
    );

    this.maestroSevicio.nuevoPuntoVenta(this.ePuntoVenta);
    this.forma.reset();
    this.cargando = false;
    this.bol_msj = true;
    setTimeout(() => {
      this.bol_msj = false;
    }, 3000);
  }

  AgregarDocumento() {
    let ePuntoSer: MA_SALPOINTSERIE;
    ePuntoSer = new MA_SALPOINTSERIE(
      this.forma.get('SP_ID').value,
      this.frmdet.get('SS_ID_DOCUMENT').value,
      this.frmdet.get('SS_SERIE').value,
      this.frmdet.get('SS_INITCORRE').value,
      this.frmdet.get('SS_PRINTING_FORMAT').value,
      'A', 1);

    this.maestroSevicio.nuevoPuntoSerie(ePuntoSer);

    this.maestroSevicio.getPuntoSeries(this.id).subscribe(
      (data: MA_SALPOINTSERIE[]) => { 
        this.ePuntoSerie = [];
        this.ePuntoSerie = data }
    );

  }


}
