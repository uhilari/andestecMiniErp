import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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


//importar rutas
import { ROUTES } from './app.routes';


//servicios
import { MaestrosService } from './services/maestros.service';
import { TransaccionregComponent } from './components/transacciones/transaccionreg.component';
import { ReporteStockComponent } from './components/reportes/reporte-stock/reporte-stock.component';








@NgModule({
  declarations: [
    AppComponent,
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
    ReporteStockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
    MaestrosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
