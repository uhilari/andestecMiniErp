import { Routes, Router, RouterLink } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticuloComponent } from './components/maestros/articulo/articulo.component';
import { ArticulolistComponent } from './components/maestros/articulo/articulolist.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { AlmacenComponent } from './components/maestros/almacen/almacen.component';
import { AlmacenlistComponent } from './components/maestros/almacen/almacenlist.component';
import { CentrocostoComponent } from './components/maestros/centrocosto/centrocosto.component';
import { CentrocostolistComponent } from './components/maestros/centrocosto/centrocostolist.component';
import { FamiliaComponent } from './components/maestros/familia/familia.component';
import { FamilialistComponent } from './components/maestros/familia/familialist.component';
import { FamiliasubComponent } from './components/maestros/familiasub/familiasub.component';
import { FamiliasublistComponent } from './components/maestros/familiasub/familiasublist.component';
import { MercanciatipoComponent } from './components/maestros/mercanciatipo/mercanciatipo.component';
import { MercanciatipolistComponent } from './components/maestros/mercanciatipo/mercanciatipolist.component';
import { ServicioComponent } from './components/maestros/servicio/servicio.component';
import { ServiciolistComponent } from './components/maestros/servicio/serviciolist.component';
import { UnidadComponent } from './components/maestros/unidad/unidad.component';
import { UnidadesComponent } from './components/maestros/unidad/unidades.component';
import { ClientelistComponent } from './components/maestros/cliente/clientelist.component';
import { ClienteComponent } from './components/maestros/cliente/cliente.component';
import { ProveedorlistComponent } from './components/maestros/proveedor/proveedorlist.component';
import { ProveedorComponent } from './components/maestros/proveedor/proveedor.component';
import { ReporteStockComponent } from './components/reportes/reporte-stock/reporte-stock.component';
import { DocalmacenComponent } from './components/transacciones/docalmacen/docalmacen.component';
import { TipotransaccionComponent } from './components/maestros/tipotransaccion/tipotransaccion.component';
import { TipotransaccionlistComponent } from './components/maestros/tipotransaccion/tipotransaccionlist.component';
import { LotelistComponent } from './components/maestros/lote/lotelist.component';
import { LoteComponent } from './components/maestros/lote/lote.component';
import { VistadocumentoComponent } from './components/transacciones/vistadocumento/vistadocumento.component';
import { FormapagoComponent } from './components/maestros/formapago/formapago.component';
import { FormapagolistComponent } from './components/maestros/formapago/formapagolist.component';
import { ProyectolistComponent } from './components/maestros/proyecto/proyectolist.component';
import { ProyectoComponent } from './components/maestros/proyecto/proyecto.component';
import { TipoventalistComponent } from './components/maestros/tipoventa/tipoventalist.component';
import { TipoventaComponent } from './components/maestros/tipoventa/tipoventa.component';
import { OrdpedidoComponent } from './components/Ventas/ordpedido/ordpedido.component';
import { OrdpedidolistComponent } from './components/Ventas/ordpedido/ordpedidolist.component';
import { VendedorlistComponent } from './components/maestros/vendedor/vendedorlist.component';
import { VendedorComponent } from './components/maestros/vendedor/vendedor.component';
import { DocumentoslistComponent } from './components/maestros/documentos/documentoslist.component';
import { DocumentosComponent } from './components/maestros/documentos/documentos.component';
import { PuntoventalistComponent } from './components/maestros/puntoventa/puntoventalist.component';
import { PuntoventaComponent } from './components/maestros/puntoventa/puntoventa.component';
import { ComprobanteComponent } from './components/Ventas/comprobante/comprobante.component';
import { ComprobantelistComponent } from './components/Ventas/comprobante/comprobantelist.component';
import { VistapedidoComponent } from './components/Ventas/ordpedido/vistapedido.component';
import { VistacomprobanteComponent } from './components/Ventas/comprobante/vistacomprobante.component';
import { VentasclienteComponent } from './components/reportes/ventascliente/ventascliente.component';
import { VentasvendedorComponent } from './components/reportes/ventasvendedor/ventasvendedor.component';
import { VentasarticuloComponent } from './components/reportes/ventasarticulo/ventasarticulo.component';
import { AlmacenkardexComponent } from './components/reportes/almacenkardex/almacenkardex.component';
import { AlmacentransacComponent } from './components/reportes/almacentransac/almacentransac.component';
import { AlmacenstockComponent } from './components/reportes/almacenstock/almacenstock.component';
import { MenureportesComponent } from './components/reportes/menureportes.component';
import { RegistroventasComponent } from './components/reportes/registroventas/registroventas.component';
import { TipoclientelistComponent } from './components/maestros/tipocliente/tipoclientelist.component';
import { TipoclienteComponent } from './components/maestros/tipocliente/tipocliente.component';
import { TipocomerciolistComponent } from './components/maestros/tipocomercio/tipocomerciolist.component';
import { TipocomercioComponent } from './components/maestros/tipocomercio/tipocomercio.component';
import { TipoprecioComponent } from './components/maestros/tipoprecio/tipoprecio.component';
import { TipopreciolistComponent } from './components/maestros/tipoprecio/tipopreciolist.component';
import { TipoproveedorlistComponent } from './components/maestros/tipoproveedor/tipoproveedorlist.component';
import { TipoproveedorComponent } from './components/maestros/tipoproveedor/tipoproveedor.component';
import { BancolistComponent } from './components/maestros/banco/bancolist.component';
import { BancoComponent } from './components/maestros/banco/banco.component';
import { CobradorComponent } from './components/maestros/cobrador/cobrador.component';
import { CobradorlistComponent } from './components/maestros/cobrador/cobradorlist.component';
import { CtabancariaComponent } from './components/maestros/ctabancaria/ctabancaria.component';
import { CtabancarialistComponent } from './components/maestros/ctabancaria/ctabancarialist.component';
import { TipotranscajaComponent } from './components/maestros/tipotranscaja/tipotranscaja.component';
import { TipotranscajalistComponent } from './components/maestros/tipotranscaja/tipotranscajalist.component';
import { PlanillacoblistComponent } from './components/caja/planillacoblist/planillacoblist.component';
import { PlanillacobnuevoComponent } from './components/caja/planillacoblist/planillacobnuevo.component';
import { PlanillacobingdocComponent } from './components/caja/planillacoblist/planillacobingdoc.component';
import { PrivateComponent } from './private/private.component';
import { LoginComponent } from './components/security/login/login.component';

import { LoginRoute, TokenGuard } from '../app/components/security';
import { XloginComponent } from './components/shared/xlogin/xlogin.component';
import { PtovtausuarioComponent } from './components/maestros/ptovtausuario/ptovtausuario.component';
import { CajapencobComponent } from './components/reportes/cajapencob/cajapencob.component';
import { VentasxdiaComponent } from './components/reportes/ventasxdia/ventasxdia.component';
import { ImportadorComponent } from './components/Herramientas/importador/importador.component';
import { TcambiolistComponent } from './components/Herramientas/tcambiolist/tcambiolist.component';
import { ConfiguracionesComponent } from './components/Herramientas/configuraciones/configuraciones.component';
import { TicketComponent } from './components/Ventas/comprobante/ticket/ticket.component';
import { UsuariolistComponent } from './components/security/usuario/usuariolist.component';
import { UsuarioComponent } from './components/security/usuario/usuario.component';
import { DespachoComponent } from './components/transacciones/despacho/despacho.component';


const CHILD_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'articulo/:id', component: ArticuloComponent },
    { path: 'articulos', component: ArticulolistComponent },
    { path: 'regAlmacen', component: TransaccionesComponent },
    { path: 'docalmacen', component: DocalmacenComponent },
    { path: 'maestros', component: MaestrosComponent },
    { path: 'almacenes', component: AlmacenlistComponent },
    { path: 'almacen/:id', component: AlmacenComponent },
    { path: 'centrocosto/:id', component: CentrocostoComponent },
    { path: 'centrocostos', component: CentrocostolistComponent },
    { path: 'familia/:id', component: FamiliaComponent },
    { path: 'familias', component: FamilialistComponent },
    { path: 'familiasub/:id', component: FamiliasubComponent },
    { path: 'familiassub', component: FamiliasublistComponent },
    { path: 'mercanciatipo/:id', component: MercanciatipoComponent },
    { path: 'mercanciatipos', component: MercanciatipolistComponent },
    { path: 'servicio/:id', component: ServicioComponent },
    { path: 'servicios', component: ServiciolistComponent },
    { path: 'unidad/:id', component: UnidadComponent },
    { path: 'unidades', component: UnidadesComponent },
    { path: 'cliente/:id', component: ClienteComponent },
    { path: 'clientes', component: ClientelistComponent },
    { path: 'proveedor/:id', component: ProveedorComponent },
    { path: 'proveedores', component: ProveedorlistComponent },
    { path: 'reportestock', component: ReporteStockComponent },
    { path: 'tipotransaccion/:id', component: TipotransaccionComponent },
    { path: 'tipotransacciones', component: TipotransaccionlistComponent },
    { path: 'lote/:id', component: LoteComponent },
    { path: 'lotes', component: LotelistComponent },
    { path: 'vistadoc/:id', component: VistadocumentoComponent },
    { path: 'formapago/:id', component: FormapagoComponent },
    { path: 'formapagos', component: FormapagolistComponent },
    { path: 'proyectos', component: ProyectolistComponent },
    { path: 'proyecto/:id', component: ProyectoComponent },
    { path: 'tipoventas', component: TipoventalistComponent },
    { path: 'tipoventa/:id', component: TipoventaComponent },
    { path: 'pedido', component: OrdpedidoComponent },
    { path: 'pedidos', component: OrdpedidolistComponent },
    { path: 'vendedores', component: VendedorlistComponent },
    { path: 'vendedor/:id', component: VendedorComponent },
    { path: 'documentos', component: DocumentoslistComponent },
    { path: 'documento/:id', component: DocumentosComponent },
    { path: 'puntoventas', component: PuntoventalistComponent },
    { path: 'puntoventa/:id', component: PuntoventaComponent },
    { path: 'comprobante', component: ComprobanteComponent },
    { path: 'comprobantes', component: ComprobantelistComponent },
    { path: 'vistaped/:id', component: VistapedidoComponent },
    { path: 'vistacompro/:id', component: VistacomprobanteComponent },
    { path: 'configusuario', component: PtovtausuarioComponent },
    { path: 'despachos', component: DespachoComponent },

    { path: 'ventasxdias', component: VentasxdiaComponent },
    { path: 'registroventas', component: RegistroventasComponent },
    { path: 'ventascliente', component: VentasclienteComponent },
    { path: 'ventasvendedor', component: VentasvendedorComponent },
    { path: 'ventasarticulo', component: VentasarticuloComponent },
    { path: 'almacenkardex', component: AlmacenkardexComponent },
    { path: 'almacentransac', component: AlmacentransacComponent },
    { path: 'almacenstock', component: AlmacenstockComponent },
    { path: 'menureporte', component: MenureportesComponent },
    { path: 'tipoclientes', component: TipoclientelistComponent },
    { path: 'tipocliente/:id', component: TipoclienteComponent },
    { path: 'tipocomercios', component: TipocomerciolistComponent },
    { path: 'tipocomercio/:id', component: TipocomercioComponent },
    { path: 'tipoprecios', component: TipopreciolistComponent },
    { path: 'tipoprecio/:id', component: TipoprecioComponent },
    { path: 'tipoproveedores', component: TipoproveedorlistComponent },
    { path: 'tipoproveedor/:id', component: TipoproveedorComponent },

    { path: 'banco/:id', component: BancoComponent },
    { path: 'bancos', component: BancolistComponent },
    { path: 'cobrador/:id', component: CobradorComponent },
    { path: 'cobradores', component: CobradorlistComponent },
    { path: 'ctacte/:id', component: CtabancariaComponent },
    { path: 'ctactes', component: CtabancarialistComponent },
    { path: 'tipotranscaja/:id', component: TipotranscajaComponent },
    { path: 'tipotranscajas', component: TipotranscajalistComponent },

    { path: 'planillacoblista', component: PlanillacoblistComponent },
    { path: 'planillacobnuevo', component: PlanillacobnuevoComponent },
    { path: 'planillacobnuevo/:id/:fecha', component: PlanillacobnuevoComponent },
    { path: 'planillacobnuevo/:id', component: PlanillacobnuevoComponent },
    { path: 'planillacobingdoc/:id/:fecha', component: PlanillacobingdocComponent },
    { path: 'planidocpencob/:tipo', component: CajapencobComponent },

    { path: 'importador', component: ImportadorComponent },
    { path: 'tcam', component: TcambiolistComponent },
    { path: 'configGen', component: ConfiguracionesComponent },
    
    { path: 'usuarios', component: UsuariolistComponent },
    { path: 'usuario/:id', component: UsuarioComponent }
    
];

export const ROUTES: Routes = [
    { path: 'xlogin', component: XloginComponent },
    { path: 'ticket', component: TicketComponent },
    {
        path: '', component: PrivateComponent,        
        children: CHILD_ROUTES , canActivate: [TokenGuard]
    },
    LoginRoute,
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    
];