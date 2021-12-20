import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { TareasServiceService } from './services/tareas-service.service';
import { BitacoraService } from './services/bitacora.service';
import { UsuariosService } from './services/usuarios.service';

import { TareasModule } from './tareas/tareas.module';
import { BitacoraModule } from './bitacora/bitacora.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NotificationsModule } from './notifications/notifications.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'hammerjs';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginModule } from './auth/login/login.module';
import { AboutComponent } from './components/about/about.component';
import { ConfirmationDialogComponent } from './categorias/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { TablerosService } from './services/tableros.service';
import { TablerosModule } from './tableros/tableros.module';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriasServiceService } from './services/categorias-service.service';
import { NotificationsService } from './services/notifications.service';
import { NotificationBellService } from './services/notification-bell.service';
import { BitacoraRefreshService } from './services/bitacora-refresh.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SubtareaService } from './services/subtarea.service';
import { PlantillaService } from './services/plantilla.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    TareasModule,
    TablerosModule,
    BitacoraModule,
    UsuariosModule,
    NotificationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    CategoriasModule,
    LoginModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),

  ],
  providers: [
    TareasServiceService,
    BitacoraService,
    UsuariosService,
    TablerosService,
    CategoriasServiceService,
    NotificationsService,
    NotificationBellService,
    BitacoraRefreshService,
    SubtareaService,
    PlantillaService
  ],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
