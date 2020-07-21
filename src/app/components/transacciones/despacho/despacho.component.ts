import { OnInit, Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Ma_Warehouse } from "../../shared/modelos/Ma_Warehouse";
import { MaestrosService } from "src/app/services/maestros.service";
import { VentasService } from "src/app/services/ventas.service";
import { ERE_LISTADOPEDIDO } from "../../shared/modelos/ERE_LISTADOPEDIDO";
import { ERE_VISTAPEDIDO } from "../../shared/modelos/ERE_VISTAPEDIDO";
import { ERE_VISTAPEDIDODET } from "../../shared/modelos/ERE_VISTAPEDIDODET";
import { ERE_DESPACHOPEDIDO } from "../../shared/modelos/ERE_DESPACHOPEDIDO";
declare var swal: any;

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {border: 1px solid red}`]
})
export class DespachoComponent implements OnInit {
  forma: FormGroup;
  eAlmacenes: Ma_Warehouse[] = [];
  ePedidos: ERE_LISTADOPEDIDO[] = [];
  eDetalle: ERE_VISTAPEDIDODET[] = [];
  pedidos: ERE_DESPACHOPEDIDO[] = [];

  bol_cargando: boolean;
  bol_error: boolean;
  msj_error: string;
  
  constructor(private mservicio: MaestrosService, private vservicio: VentasService) {
    this.CargarCombos();

    //iniciamos el formulario
    this.forma = new FormGroup({
      'f_cmbAlmacen': new FormControl(''),
      'f_hdPedido': new FormControl(''),
      'f_txtPedido': new FormControl('')
    }); 
  }

  ngOnInit(): void {
  }

  CargarCombos() {
    //Almacenes
    this.mservicio.getAlmacenes()
      .then((resp: Ma_Warehouse[]) => { 
        this.eAlmacenes = resp;
        this.forma.get('f_cmbAlmacen').setValue(resp[0].ID_WAREHOUSE);
      })
      .catch(err => { this.ShowError(err) });
  }

  ShowError(err: string) {
    this.bol_cargando = false;
    this.bol_error = true;
    this.msj_error = err;
    setTimeout(() => {
      this.bol_error = false;
    }, 2000);
  }

  CargarPedidos(search: any) {
    this.vservicio.getPedidosPendientes(search.value)
      .then((resp: ERE_LISTADOPEDIDO[]) => {
        this.ePedidos = resp;
      })
      .catch(err => this.ShowError(err));
  }

  SelectPedido(p: ERE_LISTADOPEDIDO) {
    this.forma.get('f_hdPedido').setValue(p.IDORDER);
    this.forma.get('f_txtPedido').setValue(p.NUMERO);
  }

  AgregarPedido() {
    let idPedido = this.forma.get('f_hdPedido').value;
    let nroPedido = this.forma.get('f_txtPedido').value;
    if (idPedido) {
      this.forma.get('f_hdPedido').setValue('');
      this.forma.get('f_txtPedido').setValue('');
      if (this.pedidos.findIndex(p => p.ID === idPedido) === -1) {
        this.vservicio.getRepVistaPedido(idPedido)
          .then((r: ERE_VISTAPEDIDO) => {
            r.Detalle.forEach(e => {
              var itm = this.eDetalle.find(d => d.IDARTICULO === e.IDARTICULO);
              if (itm) {
                itm.CANTIDAD += e.CANTIDAD;
              }
              else {
                this.eDetalle.push(e);
              }
            });
            this.pedidos.push({ ID: idPedido, NUMERO: nroPedido });
          })
          .catch(err => this.ShowError(err));
      }
      else {
        swal('Agregar Pedido', 'Este pedido ya se ha agregado', 'warning');
      }
    }
    else {
      swal('Agregar Pedido', 'Debe escoger un pedido', 'warning');
    }
  }

  LimpiarDetalle() {
    swal({
      title: "¿Esta seguro de Limpiar?",
      text: "Se van a eliminar todos los articulos de la vista actual",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willClear) => {
      if (willClear) {
        this.eDetalle = [];
        this.pedidos = [];
      }
    });
  }
}