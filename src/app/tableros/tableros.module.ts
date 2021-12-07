import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTablerosComponent } from './components/lista-tableros/lista-tableros.component';
import { ItemTablerosComponent } from './components/item-tableros/item-tableros.component';
import { TareasServiceService } from '../services/tareas-service.service';
import { BitacoraService } from '../services/bitacora.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TareasModule } from '../tareas/tareas.module';
import { BottomSheetOverviewExampleSheet, DetailTableroComponent } from './components/detail-tablero/detail-tablero.component';
import { ConfirmatioDelColaComponent } from './components/confirmatio-del-cola/confirmatio-del-cola.component';

import { FormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BitacoraModule } from '../bitacora/bitacora.module';




@NgModule({
  declarations: [
    ListaTablerosComponent,
    ItemTablerosComponent,
    DetailTableroComponent,
    ConfirmatioDelColaComponent,
    BottomSheetOverviewExampleSheet

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TareasModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    BitacoraModule
  ]
})
export class TablerosModule { }
