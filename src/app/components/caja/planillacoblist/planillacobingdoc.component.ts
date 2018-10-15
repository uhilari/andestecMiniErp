import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaestrosService } from '../../../services/maestros.service';
import { Ma_Customer } from '../../shared/modelos/Ma_Customer';
import { ECA_CUSTOM_BALANCE } from '../../shared/modelos/ECA_CUSTOM_BALANCE';
import { CajaService } from '../../../services/caja.service';
import { ECA_TRANSCOLLECTION } from '../../shared/modelos/ECA_TRANSCOLLECTION';
import { EMA_BANK } from '../../shared/modelos/EMA_BANK';
import { MA_DOCUMENTS } from '../../shared/modelos/MA_DOCUMENTS';
import { ECA_COLLECTION_LINE } from '../../shared/modelos/ECA_COLLECTION_LINE';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-planillacobingdoc',
  templateUrl: './planillacobingdoc.component.html',
  styles: []
})
export class PlanillacobingdocComponent {

  IdPlanilla: number;
  eClientes: Ma_Customer[];
  forma: FormGroup;
  formaPagos: FormGroup;
  eCartera: ECA_CUSTOM_BALANCE[];
  eCarteraTmp: ECA_CUSTOM_BALANCE[] = [];
  eFacturaCartera: ECA_CUSTOM_BALANCE;

  eTipoTransaccionesCaja: ECA_TRANSCOLLECTION[] = [];
  eBancos: EMA_BANK[] = [];
  eDocumentos1: MA_DOCUMENTS[] = [];
  eDocumentos2: MA_DOCUMENTS[] = [];
  eDocumentos3: MA_DOCUMENTS[] = [];

  bolDeposito: boolean = false;
  bolEfectivo: boolean = false;
  bolAplicacion: boolean = false;
  bolFactProve: boolean = false;
  bolTarjeta: boolean = false;

  constructor(
    private _ms: MaestrosService,
    private _cs: CajaService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');
    console.log(fechaReg);

    this.forma = new FormGroup({
      'IDCUSTOMER': new FormControl('', Validators.required),
      'CODCUSTOMER': new FormControl('', Validators.required),
      'DESCUSTOMER': new FormControl('', Validators.required)
    });

    this.formaPagos = new FormGroup({
      'cmbtipocobranza': new FormControl('', Validators.required),
      'txtglosa': new FormControl('', Validators.required),
      'cmbbanco': new FormControl(''),
      'cmbnumctabanco': new FormControl(''),
      'cmbdocrefban': new FormControl(''),
      'txtnumref': new FormControl(''),
      'cmbdocrefapli': new FormControl(''),
      'txtserdocrefapli': new FormControl(''),
      'txtnumdocrefapli': new FormControl(''),
      'txtfecdocrefapli': new FormControl(''),
      'cmbdocrefefe': new FormControl(''),
      'txtnumdocrefefe': new FormControl(''),
      'txtmondocrefapli': new FormControl('')
    });

    this.eFacturaCartera = new ECA_CUSTOM_BALANCE(0, 0, '', '', '', new Date(), new Date(), '', 0, 0, '', 0, '', '', '', '', new Date(), '', new Date(), 0);
    this.CargarCombos();

    route.params.subscribe(parametros => {
      this.IdPlanilla = parametros['id'];
      console.log(parametros['id']);
    })

  }

  CargarCombos() {
    this._ms.getTipoTransaccionesCaja().subscribe((data: ECA_TRANSCOLLECTION[]) => this.eTipoTransaccionesCaja = data);
    this._ms.getBancos().subscribe((data: EMA_BANK[]) => this.eBancos = data);
    this._ms.getDocumentos().subscribe((data: MA_DOCUMENTS[]) => this.eDocumentos1 = data);
    this._ms.getDocumentos().subscribe((data: MA_DOCUMENTS[]) => this.eDocumentos2 = data);
    this._ms.getDocumentos().subscribe((data: MA_DOCUMENTS[]) => this.eDocumentos3 = data);
  }

  mostrarGrupo(tt: string) {

    this.bolDeposito = false;
    this.bolEfectivo = false;
    this.bolAplicacion = false;
    this.bolFactProve = false;
    this.bolTarjeta = false;

    this.eTipoTransaccionesCaja.forEach(element => {
      if (element.TC_IDTRANSCOLLECTION == tt) {
        if (element.TC_TYPECASH == 'S') {
          this.bolEfectivo = true;
        }
        if (element.TC_TYPEDEPOSIT == 'S') {
          this.bolDeposito = true;
        }
        if (element.TC_TYPEAPPDPOC == 'S') {
          this.bolAplicacion = true;
        }
        if (element.TC_TYPEPROVIDER == 'S') {
          this.bolFactProve = true;
        }
        if (element.TC_TYPECARD == 'S') {
          this.bolTarjeta = true;
        }

      }
    });
  }

  abrirModalClientes() {
    $('#myModalClientes').modal();
  }


  abrirModalMonto(edoc: ECA_CUSTOM_BALANCE) {
    this.eFacturaCartera = edoc;
    console.log('factura Selecionada:', this.eFacturaCartera);
    $('#myModalMonto').modal();
  }

  cerrarModalMonto() {
    this.eCarteraTmp.push(this.eFacturaCartera);
    $('#myModalMonto').modal('hide');
  }

  CobrarDocumentos() {
    //validamos
    if (this.eCarteraTmp.length == 0) {
      return;
    }

    console.log(this.eCarteraTmp);

    let eDetalles: ECA_COLLECTION_LINE[] = [];
    let tipoCobranza: string = this.formaPagos.get('cmbtipocobranza').value;
    let fecha: Date = new Date();
    let fecharef: Date = new Date();
    let glosa: string = this.formaPagos.get('txtglosa').value;
    let codban: string = this.formaPagos.get('cmbbanco').value;
    let desban: string = '';
    let cuentabanco = this.formaPagos.get('cmbnumctabanco').value;
    let mediopago = ''
    let esantici = 'N';
    let tc: number = 0;
    let idvendedor: string = '';
    let docref: string = '';
    let serref: string = '';
    let numref: string = '';


    this.eTipoTransaccionesCaja.forEach(t => {
      if (t.TC_IDTRANSCOLLECTION == tipoCobranza) {
        if (t.TC_TYPEDEPOSIT == 'S') {
          docref = this.formaPagos.get('cmbdocrefban').value;
          serref = '';
          numref = this.formaPagos.get('txtnumref').value;
        }
        if (t.TC_TYPECASH == 'S') {
          docref = this.formaPagos.get('cmbdocrefefe').value;
          serref = '';
          numref = this.formaPagos.get('txtnumdocrefefe').value;
        }
        if (t.TC_TYPEAPPDPOC == 'S') {
          docref = this.formaPagos.get('cmbdocrefapli').value;
          serref = this.formaPagos.get('txtserdocrefapli').value;
          numref = this.formaPagos.get('txtnumdocrefapli').value;
          fecharef = this.formaPagos.get('txtfecdocrefapli').value;
        }
      }
    });

    this.eCarteraTmp.forEach(e => {
      eDetalles.push(new ECA_COLLECTION_LINE(this.IdPlanilla, e.CM_ID, e.CM_DOCUMENT_ID, e.CM_SERIR_DOC,
        e.CM_NUMBER_DOC, tipoCobranza, fecha, e.CM_AMOUNT, 'PEN', tc, glosa, idvendedor, codban,
        docref, serref, numref, desban, cuentabanco, mediopago, esantici, fecharef));
    });

    this._cs.postGrabarDetPlanilla(eDetalles).then(
      r => this.BuscarDocumentosPendientes()
    );

  }


  BuscarDocumentosPendientes() {
    this._cs.getCarteraPorCliente(this.forma.get('IDCUSTOMER').value).subscribe(
      (data: ECA_CUSTOM_BALANCE[]) => this.eCartera = data
    );
  }

  HelpBuscarClientes(patron: any) {
    this._ms.getClientesxNombre(patron.value)
      .subscribe((resp: Ma_Customer[]) => {
        this.eClientes = resp;
      });
  }

  HelpCargarCliente(Idcliente: number) {
    this.eClientes.forEach(element => {
      if (element.ID_CUSTOMER == Idcliente) {
        this.forma.get('IDCUSTOMER').setValue(element.ID_CUSTOMER);
        this.forma.get('CODCUSTOMER').setValue(element.NUMBER_DOCUMENT);
        this.forma.get('DESCUSTOMER').setValue(element.DESCRIPTION_CUSTOMER);
      }

    });

  }


  marcarFT(e, edoc: ECA_CUSTOM_BALANCE) {

    console.log(e.target.checked);

    if (e.target.checked) {
      this.abrirModalMonto(edoc);
    }
  }


}
