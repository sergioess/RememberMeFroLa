import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Notificacion } from '../../models/notificacion';
import { NotificationsService } from '../../services/notifications.service';
import { Utils } from '../../common/utils';
import { NotificationUread } from '../../models/notification-uread';
import { TablerosService } from 'src/app/services/tableros.service';
import { NotificationBellService } from '../../services/notification-bell.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.css']
})
export class ListNotificationsComponent implements OnInit {

  @Output() actualizarNotification = new EventEmitter<number>();

  listNotifications: NotificationUread[] = [];

  constructor(private router: Router,
    private notificacionService: NotificationsService,
    private tablerosService: TablerosService,
    private notificationsService: NotificationsService,
    private _notificationBellService: NotificationBellService) { }

  ngOnInit(): void {
    this.traerNotificaciones();
  }


  traerNotificaciones(): void {

    this.notificacionService.getUnreadNotifications(Utils.currentUser.id).subscribe(notificaciones => {
      this.listNotifications = notificaciones;
      const lista = JSON.stringify(notificaciones);
      console.log(lista);


    });
  }

  aceptar(item: NotificationUread) {


    //en tarea_coalborador marca aceptada la invitacion
    this.cambiaAceptaTableroColaborador(item);

    //Llama a notificacion Leida
    this.notificacionLeida(item);

    //Actualiza contador notificaciones sin leer



  }

  rechazar(item: NotificationUread) {

    //en tarea_coalborador marca aceptada la invitacion
    // this.cambiaAceptaTableroColaborador( item);

    //Llama a notificacion Leida
    this.notificacionLeida(item);

  }

  cambiaAceptaTableroColaborador(item: NotificationUread) {

    this.tablerosService.updateEstadoAceptado(1, item).subscribe(tablero => {
      this.listNotifications = tablero;
      const lista = JSON.stringify(tablero);
      // console.log("Invitacion Aceptada" + lista);
    });
  }

  notificacionLeida(item: NotificationUread) {
    this.notificacionService.updateReadNotification(item.id).subscribe(notificacion => {
      this.listNotifications = notificacion;
      const lista = JSON.stringify(notificacion);
      console.log("Notificacion Leida" + lista);

      this.actualizaCountNotificaciones();
      this.ngOnInit();
    });
  }


  actualizaCountNotificaciones() {
    this.notificationsService.countUnreadNotifications(Utils.currentUser.id).subscribe(notifications => {
      // console.log("notifications countUnread: " + notifications);
      const lista = JSON.stringify(notifications);
      console.log("Lista countUnread: " + lista);
      // this.countUnreadNotifications = notifications;
      // this.actualizarNotification.emit(notifications);

      this._notificationBellService.sendValor(notifications);
      this.ngOnInit();
    });
  }

}
