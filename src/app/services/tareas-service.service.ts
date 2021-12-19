import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from '../models/tarea'
import { Observable } from 'rxjs';
import { FiltroTarea } from '../models/filtro-tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json'
    })
  };


  constructor(private http: HttpClient) { }

  // url: string = 'https://remembermebackend.herokuapp.com/api/';
  url: string = 'http://localhost:8000/api/';
  // url: string = 'https://www.trattoria.com.co/apirem/api/';

  items: Tarea[] = [];

  getTareas(): Observable<Tarea[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<Tarea[]>(this.url + 'tareas');

  }

  // getTareasUsuario(id: number): Observable<Tarea[]> {
  //   // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
  //   // return this.items;
  //   return this.http.get<Tarea[]>(this.url + 'tareasusuario' + '/' + id);

  // }

  updateTarea(id: number, data: Tarea): Observable<any> {
    return this.http.put(this.url + 'tareas' + '/' + id, data, this.httpOptions);
  }

  createTarea(data: Tarea): Observable<any> {
    return this.http.post(this.url + 'tareas', data, this.httpOptions);
  }

  createTareaTablero(data: Tarea): Observable<any> {
    return this.http.post(this.url + 'tareastablero', data, this.httpOptions);
  }

  getTareasCategoria(data: Tarea): Observable<Tarea[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.post<Tarea[]>(this.url + 'tareasClasificacion', data);

  }
  getTareasUsuario(id: number): Observable<Tarea[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<Tarea[]>(this.url + 'tareasusuario' + '/' + id);
  }


  getTareasTablero(id_tablero: number): Observable<Tarea[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<Tarea[]>(this.url + 'tareastablero' + '/' + id_tablero);

  }

  getTareasFiltered(data: FiltroTarea, id: number): Observable<any> {
    return this.http.post(this.url + 'tareasfiltro/' + id, data);

  }


  deleteTarea(id: number): Observable<any> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.delete<any>(this.url + 'tareas' + '/' + id, this.httpOptions);
  }

}
