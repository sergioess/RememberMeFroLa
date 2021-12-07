import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { Utils } from 'src/app/common/utils';
import { UsuariosService } from './services/usuarios.service';
import { NotificationsService } from './services/notifications.service';
import { NotificationBellService } from './services/notification-bell.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rememberme';

  datosUsuario: Usuario = new Usuario();
  countUnreadNotifications = Utils.unreadNotifications;


  constructor(private router: Router,
    private usuarioService: UsuariosService,
    private notificationsService: NotificationsService,
    private _notificationBell: NotificationBellService) { }


  ngOnInit(): void {


    if (Utils.currentUser.id != 0) {
      // setInterval(() => {
      this.datosUsuario = Utils.currentUser;
      // console.log(this.datosUsuario)
      // }, 1000)
    }
    else {
      // console.log("Id igual a cero");
      let texto: string | null = "";
      texto = sessionStorage.getItem('user');

      let numero: number = Number(texto);
      numero = numero / 598;
      numero = numero * 3;
      numero = numero / 12;
      // console.log("Id logueo guardado: " + numero);


      this.usuarioService.getUsuariosById(numero).subscribe(usuario => {

        const lista = JSON.stringify(usuario.id);

        if (usuario) {
          Utils.currentUser = usuario;
          this.datosUsuario = Utils.currentUser;
          // console.log("Usuario despues de refrescar" + usuario.correo);
        }


      });

      // this.TraeUnreadNotifications();


    }

    this._notificationBell.countUnreadNoti$.subscribe(valor => {
      this.countUnreadNotifications = valor;
    })


  }

  logout(): void {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.navigate("/");
  }


  CambiaNumNoti(cantidad: any) {
    // console.log("Dato desde hijo: " + cantidad);
    this.countUnreadNotifications = cantidad;
  }

  TraeUnreadNotifications() {
    // console.log("Usr actual: " + Utils.currentUser.id);
    this.notificationsService.countUnreadNotifications(22).subscribe(notifications => {
      // console.log("notifications countUnread: " + notifications);
      const lista = JSON.stringify(notifications);
      // console.log("Lista countUnread: " + lista);
      this.countUnreadNotifications = notifications;

    });
  }

  navigate(ruta: string) {
    // console.log(serie);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([ruta]);
  }

  validaUsuarioLogueado(): boolean {
    if (this.usuarioService.isAuthenticated()) {
      return false;
    }
    else {
      return true;
    }
  }

  obtubeFoco() {
    // console.log("El CLick");
    if (this.usuarioService.isAuthenticated()) {

      this.datosUsuario = Utils.currentUser;

    }
    // console.log(Utils.currentUser);
  }


}
