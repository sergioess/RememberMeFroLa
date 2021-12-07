import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { LoginUsuariosComponent } from './components/login-usuarios/login-usuarios.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGuard } from '../guards/auth.guard';




@NgModule({
  declarations: [
    RegistroUsuariosComponent,
    LoginUsuariosComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
})
export class UsuariosModule { }
