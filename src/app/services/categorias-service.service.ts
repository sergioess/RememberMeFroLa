import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria'
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // url: string = 'https://remembermebackend.herokuapp.com/api/';
  url: string = 'http://localhost:8000/api/';
  // url: string = 'https://www.trattoria.com.co/apirem/api/';

  items: Categoria[] = [];
  getCategorias(id_usuario: number): Observable<Categoria[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<Categoria[]>(this.url + 'categoriausr' + '/' + id_usuario);

  }

  updateCategorias(id: number, data: Categoria): Observable<any> {


    const lista = JSON.stringify(data);
    // console.log("Actualiza" + lista);
    return this.http.put(this.url + 'categoria' + '/' + id, data, this.httpOptions);
  }

  createCategoria(data: Categoria): Observable<any> {
    return this.http.post(this.url + 'categoria', data, this.httpOptions);
  }

  removeCategoria(id: number): Observable<Categoria[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.delete<Categoria[]>(this.url + 'categoria' + '/' + id);

  }

}
