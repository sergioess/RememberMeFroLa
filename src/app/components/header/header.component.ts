import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Utils } from '../../common/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() actualizarNotification = new EventEmitter<number>();

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
  }

  ActualizaNoti(id: number): void {
    // this.actualizarNotification.emit();

    // console.log("Id Usuario Actual" + Utils.currentUser.id)

    this.notificationsService.countUnreadNotifications(Utils.currentUser.id).subscribe(notifications => {
      // console.log("notifications countUnread: " + notifications);
      // const lista = JSON.stringify(notifications);
      // console.log("Lista countUnread: " + lista);
      // this.countUnreadNotifications = notifications;
      this.actualizarNotification.emit(notifications);

    });
  }

}
