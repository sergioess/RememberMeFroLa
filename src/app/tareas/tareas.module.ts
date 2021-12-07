import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { TareasServiceService } from '../services/tareas-service.service';
import { ItemTareaComponent } from './components/item-tarea/item-tarea.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { TareaDetailComponent } from './components/tarea-detail/tarea-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BitacoraModule } from '../bitacora/bitacora.module';




@NgModule({
  declarations: [
    ListaTareasComponent,
    ItemTareaComponent,
    TareaDetailComponent

  ],
  entryComponents: [TareaDetailComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AngularMaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
    BitacoraModule
  ],
  providers: [
    TareasServiceService
  ],
  exports: [
    ItemTareaComponent
  ]

})
export class TareasModule { }
