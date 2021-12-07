import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaBitacoraComponent } from './bitacora/components/lista-bitacora/lista-bitacora.component';
import { ListaCategoriasComponent } from './categorias/components/lista-categorias/lista-categorias.component';
import { ListaTablerosComponent } from './tableros/components/lista-tableros/lista-tableros.component';
import { ListaTareasComponent } from './tareas/components/lista-tareas/lista-tareas.component';
import { AboutComponent } from './components/about/about.component';
import { LoginUsuariosComponent } from './usuarios/components/login-usuarios/login-usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistroUsuariosComponent } from './usuarios/components/registro-usuarios/registro-usuarios.component';
import { DetailTableroComponent } from './tableros/components/detail-tablero/detail-tablero.component';
import { ListNotificationsComponent } from './notifications/list-notifications/list-notifications.component';

const routes: Routes = [
  { path: 'tableros', component: ListaTablerosComponent },
  { path: 'bitacora', component: ListaBitacoraComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: ListaCategoriasComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tareas', component: ListaTareasComponent },
  { path: 'login', component: LoginUsuariosComponent },
  { path: 'registro', component: RegistroUsuariosComponent },
  { path: 'detalletablero', component: DetailTableroComponent },
  { path: 'notification', component: ListNotificationsComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
