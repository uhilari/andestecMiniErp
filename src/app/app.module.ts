import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppGlobals } from '../app/components/shared/modelos/app.global';

//componenetes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProveedorComponent } from './components/maestros/proveedor/proveedor.component';
import { ClienteComponent } from './components/maestros/cliente/cliente.component';
import { ArticuloComponent } from './components/maestros/articulo/articulo.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AlmacenComponent } from './components/maestros/almacen/almacen.component';
import { AlmacenlistComponent } from './components/maestros/almacen/almacenlist.component';
import { CentrocostoComponent } from './components/maestros/centrocosto/centrocosto.component';
import { CentrocostolistComponent } from './components/maestros/centrocosto/centrocostolist.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { FamilialistComponent } from './components/maestros/familia/familialist.component';
import { FamiliaComponent } from './components/maestros/familia/familia.component';
import { FamiliasubComponent } from './components/maestros/familiasub/familiasub.component';
import { FamiliasublistComponent } from './components/maestros/familiasub/familiasublist.component';
import { MercanciatipoComponent } from './components/maestros/mercanciatipo/mercanciatipo.component';
import { MercanciatipolistComponent } from './components/maestros/mercanciatipo/mercanciatipolist.component';
import { ServicioComponent } from './components/maestros/servicio/servicio.component';
import { ServiciolistComponent } from './components/maestros/servicio/serviciolist.component';
import { UnidadComponent } from './components/maestros/unidad/unidad.component';
import { UnidadesComponent } from './components/maestros/unidad/unidades.component';
import { ArticulolistComponent } from './components/maestros/articulo/articulolist.component';
import { ClientelistComponent } from './components/maestros/cliente/clientelist.component';
import { ProveedorlistComponent } from './components/maestros/proveedor/proveedorlist.component';
import { TransaccioncabComponent } from './components/transacciones/transaccioncab.component';
import { TransacciondetComponent } from './components/transacciones/transacciondet.component';
import { TransaccionregComponent } from './components/transacciones/transaccionreg.component';
import { ReporteStockComponent } from './components/reportes/reporte-stock/reporte-stock.component';
import { DocalmacenComponent } from './components/transacciones/docalmacen/docalmacen.component';
import { TipotransaccionComponent } from './components/maestros/tipotransaccion/tipotransaccion.component';
import { TipotransaccionlistComponent } from './components/maestros/tipotransaccion/tipotransaccionlist.component';
import { LoteComponent } from './components/maestros/lote/lote.component';
import { LotelistComponent } from './components/maestros/lote/lotelist.component';
import { VistadocumentoComponent } from './components/transacciones/vistadocumento/vistadocumento.component';


//componentes de ventas
import { FormapagoComponent } from './components/maestros/formapago/formapago.component';
import { FormapagolistComponent } from './components/maestros/formapago/formapagolist.component';
import { ProyectoComponent } from './components/maestros/proyecto/proyecto.component';
import { ProyectolistComponent } from './components/maestros/proyecto/proyectolist.component';
import { TipoventaComponent } from './components/maestros/tipoventa/tipoventa.component';
import { TipoventalistComponent } from './components/maestros/tipoventa/tipoventalist.component';
import { OrdpedidoComponent } from './components/Ventas/ordpedido/ordpedido.component';
import { OrdpedidolistComponent } from './components/Ventas/ordpedido/ordpedidolist.component';
import { VendedorComponent } from './components/maestros/vendedor/vendedor.component';
import { VendedorlistComponent } from './components/maestros/vendedor/vendedorlist.component';
import { DocumentosComponent } from './components/maestros/documentos/documentos.component';
import { DocumentoslistComponent } from './components/maestros/documentos/documentoslist.component';
import { PuntoventaComponent } from './components/maestros/puntoventa/puntoventa.component';
import { PuntoventalistComponent } from './components/maestros/puntoventa/puntoventalist.component';


import { VistacomprobanteComponent } from './components/Ventas/comprobante/vistacomprobante.component';
import { VistapedidoComponent } from './components/Ventas/ordpedido/vistapedido.component';
import { TipocomercioComponent } from './components/maestros/tipocomercio/tipocomercio.component';
import { TipoclienteComponent } from './components/maestros/tipocliente/tipocliente.component';
import { TipoprecioComponent } from './components/maestros/tipoprecio/tipoprecio.component';
import { TipoclientelistComponent } from './components/maestros/tipocliente/tipoclientelist.component';

//componentes de Caja
import { BancoComponent } from './components/maestros/banco/banco.component';
import { BancolistComponent } from './components/maestros/banco/bancolist.component';
import { CtabancariaComponent } from './components/maestros/ctabancaria/ctabancaria.component';
import { CtabancarialistComponent } from './components/maestros/ctabancaria/ctabancarialist.component';


//importar rutas
import { ROUTES } from './app.routes';


//servicios
import { MaestrosService } from './services/maestros.service';
import { TransaccionesService } from './services/transacciones.service';
import { VentasService } from './services/ventas.service';
import { ReportesService } from './services/reportes.service';
import { CajaService } from './services/caja.service';
import { AuthService } from "./services/auth/auth.service";

//reportes
import { AlmacenkardexComponent } from './components/reportes/almacenkardex/almacenkardex.component';
import { AlmacentransacComponent } from './components/reportes/almacentransac/almacentransac.component';
import { AlmacenstockComponent } from './components/reportes/almacenstock/almacenstock.component';
import { VentasvendedorComponent } from './components/reportes/ventasvendedor/ventasvendedor.component';
import { VentasarticuloComponent } from './components/reportes/ventasarticulo/ventasarticulo.component';
import { VentasclienteComponent } from './components/reportes/ventascliente/ventascliente.component';
import { MenureportesComponent } from './components/reportes/menureportes.component';
import { RegistroventasComponent } from './components/reportes/registroventas/registroventas.component';
import { TipocomerciolistComponent } from './components/maestros/tipocomercio/tipocomerciolist.component';
import { TipopreciolistComponent } from './components/maestros/tipoprecio/tipopreciolist.component';
import { TipoproveedorComponent } from './components/maestros/tipoproveedor/tipoproveedor.component';
import { TipoproveedorlistComponent } from './components/maestros/tipoproveedor/tipoproveedorlist.component';
import { CobradorComponent } from './components/maestros/cobrador/cobrador.component';
import { CobradorlistComponent } from './components/maestros/cobrador/cobradorlist.component';
import { TipotranscajaComponent } from './components/maestros/tipotranscaja/tipotranscaja.component';
import { TipotranscajalistComponent } from './components/maestros/tipotranscaja/tipotranscajalist.component';
import { PlanillacoblistComponent } from './components/caja/planillacoblist/planillacoblist.component';
import { PlanillacobnuevoComponent } from './components/caja/planillacoblist/planillacobnuevo.component';
import { PlanillacobingdocComponent } from './components/caja/planillacoblist/planillacobingdoc.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { MenumultiComponent } from './components/shared/menumulti/menumulti.component';
import { VentasxdiaComponent } from './components/reportes/ventasxdia/ventasxdia.component';




//servicio de Token
import { LoginRoute, SecurityModule, TokenGuard } from '../app/components/security';
import { PrivateComponent } from './private/private.component';



import { ComprobanteComponent } from './components/Ventas/comprobante/comprobante.component';
import { ComprobantelistComponent } from './components/Ventas/comprobante/comprobantelist.component';
import { XloginComponent } from './components/shared/xlogin/xlogin.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { MsgerrorComponent } from './components/shared/msgerror/msgerror.component';
import { MsgsuccessComponent } from './components/shared/msgsuccess/msgsuccess.component';
import { PtovtausuarioComponent } from './components/maestros/ptovtausuario/ptovtausuario.component';
import { CajapencobComponent } from './components/reportes/cajapencob/cajapencob.component';
import { ImportadorComponent } from './components/importador/importador.component';


@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    HomeComponent,
    ProveedorComponent,
    ClienteComponent,
    ArticuloComponent,
    NavbarComponent,
    TransaccionesComponent,
    MaestrosComponent,
    AlmacenComponent,
    AlmacenlistComponent,
    CentrocostoComponent,
    CentrocostolistComponent,
    FamilialistComponent,
    FamiliaComponent,
    FamiliasubComponent,
    FamiliasublistComponent,
    MercanciatipoComponent,
    MercanciatipolistComponent,
    ServicioComponent,
    ServiciolistComponent,
    UnidadComponent,
    UnidadesComponent,
    ArticulolistComponent,
    ClientelistComponent,
    ProveedorlistComponent,
    TransaccioncabComponent,
    TransacciondetComponent,
    TransaccionregComponent,
    ReporteStockComponent,
    DocalmacenComponent,
    TipotransaccionComponent,
    TipotransaccionlistComponent,
    LoteComponent,
    LotelistComponent,
    VistadocumentoComponent,
    FormapagoComponent,
    FormapagolistComponent,
    ProyectoComponent,
    ProyectolistComponent,
    TipoventaComponent,
    TipoventalistComponent,
    OrdpedidoComponent,
    OrdpedidolistComponent,
    VendedorComponent,
    VendedorlistComponent,
    DocumentosComponent,
    DocumentoslistComponent,
    PuntoventaComponent,
    PuntoventalistComponent,
    ComprobanteComponent,
    ComprobantelistComponent,
    VistapedidoComponent,
    VistacomprobanteComponent,
    AlmacenkardexComponent,
    AlmacentransacComponent,
    AlmacenstockComponent,
    VentasvendedorComponent,
    VentasarticuloComponent,
    VentasclienteComponent,
    MenureportesComponent,
    RegistroventasComponent,
    TipocomercioComponent,
    TipoclienteComponent,
    TipoprecioComponent,
    TipoclientelistComponent,
    TipocomerciolistComponent,
    TipopreciolistComponent,
    TipoproveedorComponent,
    TipoproveedorlistComponent,
    BancoComponent,
    BancolistComponent,
    CtabancariaComponent,
    CtabancarialistComponent,
    CobradorComponent,
    CobradorlistComponent,
    TipotranscajaComponent,
    TipotranscajalistComponent,
    PlanillacoblistComponent,
    PlanillacobnuevoComponent,
    PlanillacobingdocComponent,
    MenuComponent,
    MenumultiComponent,
    PrivateComponent,
    XloginComponent,
    LoadingComponent,
    MsgerrorComponent,
    MsgsuccessComponent,
    PtovtausuarioComponent,
    CajapencobComponent,
    VentasxdiaComponent,
    ImportadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    SecurityModule
  ],
  providers: [
    AppGlobals,
    MaestrosService,
    TransaccionesService,
    VentasService,
    ReportesService,
    CajaService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
