import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../models/tarea'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasServiceService {

  constructor(private http: HttpClient) { }

  // url: string = 'https://remembermebackend.herokuapp.com/api/';
  url: string = 'http://localhost:8000/api/';
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
    return this.http.put(this.url + 'tareas' + '/' + id, data);
  }

  createTarea(data: Tarea): Observable<any> {
    return this.http.post(this.url + 'tareas/', data);
  }

  createTareaTablero(data: Tarea): Observable<any> {
    return this.http.post(this.url + 'tareastablero/', data);
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

}
