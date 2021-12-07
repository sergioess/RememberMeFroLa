import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ListaBitacoraComponent } from './components/lista-bitacora/lista-bitacora.component';
import { BitacoraService } from '../services/bitacora.service';
import { ItemBitacoraComponent } from './components/item-bitacora/item-bitacora.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListaBitacoraExportComponent } from './components/lista-bitacora-export/lista-bitacora-export.component';


@NgModule({
  declarations: [
    ListaBitacoraComponent,
    ItemBitacoraComponent,
    ListaBitacoraExportComponent,

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ],
  exports: [
    ListaBitacoraComponent,
    ListaBitacoraExportComponent
  ],
  providers: [
    BitacoraService,
  ],
})
export class BitacoraModule { }
