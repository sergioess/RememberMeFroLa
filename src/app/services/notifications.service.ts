import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Notificacion } from '../models/notificacion';
import { NotificationUread } from '../models/notification-uread';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  // url: string = 'https://remembermebackend.herokuapp.com/api/';
  // url: string = 'http://localhost:8000/api/';
  url: string = 'https://trattoria.com.co/apirem/api/';




  getUnreadNotifications(id_usuario: number): Observable<NotificationUread[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };

    return this.http.get<NotificationUread[]>(this.url + 'notificacion' + '/' + id_usuario, httpOptions);

  }




  countUnreadNotifications(id_usuario: number): Observable<number> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<number>(this.url + 'notificacioncount' + '/' + id_usuario);

  }

  updateReadNotification(id: number): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };


    // console.log("Actualiza" + lista);
    return this.http.put(this.url + 'notificacion' + '/' + id, httpOptions);
  }


  createNotificacion(data: Notificacion): Observable<any> {


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.post(this.url + 'notificacion/', data);
  }
}
