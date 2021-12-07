import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';



@NgModule({
  declarations: [
    ListNotificationsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class NotificationsModule { }
