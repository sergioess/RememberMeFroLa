import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Tablero } from '../models/tablero';
import { Tarea } from '../models/tarea';
import { TableroColaborador } from '../models/tablero-colaborador';
import { NotificationUread } from '../models/notification-uread';



@Injectable({
  providedIn: 'root'
})
export class TablerosService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json'
    })
  };

  public tableroPasaDetail: Tablero = new Tablero();

  constructor(private http: HttpClient) { }

  // url: string = 'https://remembermebackend.herokuapp.com/api/';
  url: string = 'http://localhost:8000/api/';
  // url: string = 'https://www.trattoria.com.co/apirem/api/';


  items: Tablero[] = [];

  getTablerosUsuario(id_usuario: number): Observable<Tablero[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<Tablero[]>(this.url + 'tablerousr' + '/' + id_usuario);

  }

  getColaboradoesTablero(id_tablero: number): Observable<TableroColaborador[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<TableroColaborador[]>(this.url + 'tablerocolabora' + '/' + id_tablero);

  }

  getTableroTarea(id_tablero: number): Observable<Tablero> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<Tablero>(this.url + 'tablero' + '/' + id_tablero);

  }

  removeColaborador(id: number): Observable<TableroColaborador> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.delete<TableroColaborador>(this.url + 'removecolabora' + '/' + id);

  }

  updateRolColaborador(id: number, data: TableroColaborador): Observable<any> {
    return this.http.put(this.url + 'updaterolcol' + '/' + id, data, this.httpOptions);
  }

  createTableroColaborador(data: TableroColaborador): Observable<any> {

    // console.log(data.id_colaborador);
    // console.log(data.id_tablero);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.post(this.url + 'tablero_colaboradores', data, this.httpOptions);
  }



  createTablero(data: Tablero): Observable<any> {


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.post(this.url + 'tablero', data, this.httpOptions);
  }


  updateEstadoAceptado(id: number, data: NotificationUread): Observable<any> {

    // console.log("Item desde TableroService" + JSON.stringify(data));

    return this.http.put(this.url + 'tablero_colaboradores_acepta' + '/' + data.id, data, this.httpOptions);
  }


}
