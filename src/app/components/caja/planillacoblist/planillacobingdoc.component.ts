import { Component, OnInit } from '@angular/core';
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
import { ECA_BANKACCOUNT } from '../../shared/modelos/ECA_BANKACCOUNT';
import { EMA_CREDITCARD } from '../../shared/modelos/EMA_CREDITCARD';
import { Ma_Moneda } from '../../shared/modelos/Ma_Moneda';
import { VentasService } from 'src/app/services/ventas.service';
declare var $: any;

@Component({
  selector: 'app-planillacobingdoc',
  templateUrl: './planillacobingdoc.component.html'
})
export class PlanillacobingdocComponent implements OnInit {

  IdPlanilla: number;
  fePlanilla: string;
  eClientes: Ma_Customer[];
  forma: FormGroup;
  formaPagos: FormGroup;
  formaCobros: FormGroup;
  eCartera: ECA_CUSTOM_BALANCE[] = [];
  eCarteraTmp: ECobranzaTmp[] = [];
  eCarteraFila: ECobranzaTmp;
  bol_cargando: boolean;
  bol_verTabla: boolean;


  eTipoTransaccionesCaja: ECA_TRANSCOLLECTION[] = [];
  eBancos: EMA_BANK[] = [];
  eCtasBancos: ECA_BANKACCOUNT[] = [];
  eDocumentos1: MA_DOCUMENTS[] = [];
  eDocumentos2: MA_DOCUMENTS[] = [];
  eDocumentos3: MA_DOCUMENTS[] = [];
  eTarjetas: EMA_CREDITCARD[] = [];
  eMonedas: Ma_Moneda[] = [];

  bolDeposito: boolean = false;
  bolEfectivo: boolean = false;
  bolAplicacion: boolean = false;
  bolFactProve: boolean = false;
  bolTarjeta: boolean = false;
  bolCobroDolar: boolean = false;

  constructor(
    private _ms: MaestrosService,
    private _cs: CajaService,
    private vservicio: VentasService,
    private router: Router,
    private route: ActivatedRoute
  ) {


    console.log('punto 1');

    //iniciamos el formulario
    let x: Date = new Date();
    let fechaReg: string = x.getFullYear() + "-" + (x.getMonth() + 1).toString().padStart(2, '0') + '-' + x.getDate().toString().padStart(2, '0');
    console.log(fechaReg);

    this.forma = new FormGroup({
      'IDCUSTOMER': new FormControl('', Validators.required),
      'CODCUSTOMER': new FormControl('', Validators.required),
      'DESCUSTOMER': new FormControl('', Validators.required)
    });

    this.formaCobros = new FormGroup({
      'cmbmoneda': new FormControl('PEN'),
      'txttc': new FormControl('3.25'),
      'txtmontocob': new FormControl('0'),
      'txtmontoaltc': new FormControl('0')
    });
    console.log('punto 2');
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
      'txtmondocrefapli': new FormControl(''),
      'cmbtarjeta': new FormControl(''),
      'txtnumope': new FormControl('')
    });

    console.log('punto 3');

    this.eCarteraFila = new ECobranzaTmp(0, '', '', '', '', 0, 0, 0, 0, 0, 0);
    this.CargarCombos();

  }

  ngOnInit() {

    this.route.params.subscribe(parametros => {
      this.IdPlanilla = parametros['id'];
      this.fePlanilla = parametros['fecha'];


      console.log('paso por aki');

      console.log(parametros['id']);
      console.log(this.fePlanilla);


    });
  }

  CargarCombos() {
    this._ms.getTipoTransaccionesCaja().then((data: ECA_TRANSCOLLECTION[]) => this.eTipoTransaccionesCaja = data);
    this._ms.getBancos().then((data: EMA_BANK[]) => this.eBancos = data);
    this._ms.getDocumentos().then((data: MA_DOCUMENTS[]) => this.eDocumentos1 = data);
    this._ms.getDocumentos().then((data: MA_DOCUMENTS[]) => this.eDocumentos2 = data);
    this._ms.getDocumentos().then((data: MA_DOCUMENTS[]) => this.eDocumentos3 = data);
    this._ms.getTarjetasCredito().then((dat: EMA_CREDITCARD[]) => this.eTarjetas = dat);
    this.eMonedas = this._ms.getMonedas();
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

  getCtasBancos(idbanco: string) {
    this._ms.getCuentaBancariaxBanco(idbanco).then(
      (data: ECA_BANKACCOUNT[]) => this.eCtasBancos = data
    );
  }

  abrirModalClientes() {
    this.eClientes = [];
    $('#myModalClientes').modal();
  }

  cerrarModalClientes() {
    $('#myModalClientes').modal('hide');
  }


  abrirModalMonto(edoc: ECA_CUSTOM_BALANCE) {

    this.eCarteraFila = new ECobranzaTmp(edoc.CM_ID, edoc.CM_DOCUMENT_ID, edoc.CM_SERIR_DOC,
      edoc.CM_NUMBER_DOC, edoc.CM_CURRENCY_ID, edoc.CM_AMOUNT, edoc.CM_AMOUNT_BALANCE, edoc.CM_AMOUNT_BALANCE, 0, 0, 0);


    if (this.formaCobros.get('cmbmoneda').value == 'DOL') {
      this.bolCobroDolar = true;
      var tc = this.formaCobros.get('txttc').value;
      this.eCarteraFila.MONTOORIDOL = roundNumber((this.eCarteraFila.MONTOORI / tc), 2);
      this.eCarteraFila.SALDOORIDOL = roundNumber((this.eCarteraFila.SALDOORI / tc), 2);
      this.eCarteraFila.COBROORIDOL = roundNumber((this.eCarteraFila.COBROORI / tc), 2);


      var pagoTopeDolares: number = parseInt((<HTMLInputElement>document.getElementById("txtmontocob")).value);
      var cobroTotalDolares: number = 0;

      this.eCarteraTmp.forEach(element => {
        cobroTotalDolares = cobroTotalDolares + element.COBROORIDOL;
      });

      var montoaCobrar = this.eCarteraFila.COBROORIDOL;

      if ((cobroTotalDolares + montoaCobrar) > pagoTopeDolares) {
        this.eCarteraFila.COBROORIDOL = (pagoTopeDolares - cobroTotalDolares);
        (<HTMLInputElement>document.getElementById("montoDolar")).value = this.eCarteraFila.COBROORIDOL.toString();
        (<HTMLInputElement>document.getElementById("monto")).value = (this.eCarteraFila.COBROORIDOL * tc).toString();
        this.eCarteraFila.COBROORI = (this.eCarteraFila.COBROORIDOL * tc);
      }

    }
    else // soles
    {
      (<HTMLInputElement>document.getElementById("monto")).value = this.eCarteraFila.COBROORI.toString();

    }


    $('#myModalMonto').modal();
  }

  cerrarModalMonto() {
    if (this.formaCobros.get('cmbmoneda').value == 'DOL') {
      var montoDolar: number = parseFloat((<HTMLInputElement>document.getElementById("montoDolar")).value);
      this.eCarteraFila.COBROORIDOL = montoDolar;
      this.eCarteraTmp.push(this.eCarteraFila);

    }
    else {//Soles
      var monto: number = parseFloat((<HTMLInputElement>document.getElementById("monto")).value);
      this.eCarteraFila.COBROORI = monto;
      this.eCarteraTmp.push(this.eCarteraFila);
    }


    $('#myModalMonto').modal('hide');
  }



  CobrarDocumentos() {
    //validamos
    if (this.eCarteraTmp.length == 0) {
      return;
    }

    if (!this.formaPagos.valid) {
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
        if (t.TC_TYPECARD == 'S') {
          docref = this.formaPagos.get('cmbtarjeta').value;
          numref = this.formaPagos.get('txtnumope').value;
        }
      }
    });

    this.eCarteraTmp.forEach(e => {

      eDetalles.push(new ECA_COLLECTION_LINE(this.IdPlanilla, e.IDCARTERA, e.TD, e.SD,
        e.ND, tipoCobranza, fecha, e.MONEDAORI == 'PEN' ? e.COBROORI : e.COBROORIDOL, e.MONEDAORI, tc, glosa, idvendedor, codban,
        docref, serref, numref, desban, cuentabanco, mediopago, esantici, fecharef));
    });

    this._cs.postGrabarDetPlanilla(eDetalles).then(
      r => {
        this.BuscarDocumentosPendientes();
        this.eCarteraTmp = [];
      }
    );

  }


  BuscarDocumentosPendientes() {
    this.bol_cargando = true;
    this._cs.getCarteraPorCliente(this.forma.get('IDCUSTOMER').value).then(
      (data: ECA_CUSTOM_BALANCE[]) => {
        this.eCartera = data;
        this.bol_cargando = false;
        this.bol_verTabla = true;
      }
    ).catch(err => { alert('Ocurrio un error: ' + err); this.bol_cargando = false; });
  }

  HelpBuscarClientes(patron: any) {
    this._ms.getClientesxNombre(patron.value)
      .then((resp: Ma_Customer[]) => {
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

    this.BuscarDocumentosPendientes();
  }

  marcarFT(e, edoc: ECA_CUSTOM_BALANCE) {
    console.log(e.target.checked);
    if (e.target.checked) {
      this.abrirModalMonto(edoc);
    }
  }





  buscarClientexDocumento(numero: string) {
    this.vservicio.getClientexNumDoc(numero).subscribe(
      (dato: Ma_Customer) => {
        if (dato) {
          this.forma.get('IDCUSTOMER').setValue(dato.ID_CUSTOMER);
          this.forma.get('CODCUSTOMER').setValue(dato.NUMBER_DOCUMENT);
          this.forma.get('DESCUSTOMER').setValue(dato.DESCRIPTION_CUSTOMER);
          this.BuscarDocumentosPendientes();
        } else {
          this.forma.get('IDCUSTOMER').setValue("");
          this.forma.get('CODCUSTOMER').setValue("");
          this.forma.get('DESCUSTOMER').setValue("");
        }
      }
    );
  }


}


function roundNumber(number, precision): number {
  precision = Math.abs(parseInt(precision)) || 0;
  var multiplier = Math.pow(10, precision);
  return (Math.round(number * multiplier) / multiplier);
}




class ECobranzaTmp {
  constructor(
    public IDCARTERA: number,
    public TD: string,
    public SD: string,
    public ND: string,
    public MONEDAORI: string,
    public MONTOORI: number,
    public SALDOORI: number,
    public COBROORI: number,
    public MONTOORIDOL: number,
    public SALDOORIDOL: number,
    public COBROORIDOL: number,
  ) { }

}
