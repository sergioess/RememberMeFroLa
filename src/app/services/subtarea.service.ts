import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SubTarea } from '../models/sub-tarea';

@Injectable({
  providedIn: 'root'
})
export class SubtareaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json'
    })
  };

  constructor(private http: HttpClient) { }


  // url: string = 'https://www.trattoria.com.co/apirem/api/';
  url: string = 'http://localhost:8000/api/';




  getSubTareasTarea(id_tarea: number): Observable<SubTarea[]> {
    return this.http.get<SubTarea[]>(this.url + 'subtarea' + '/' + id_tarea);
  }

  createSubTarea(data: SubTarea): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.url + 'subtarea', data, this.httpOptions);
  }


  setSubTareaEstado(id_tarea: number): Observable<SubTarea[]> {
    return this.http.get<SubTarea[]>(this.url + 'subtareacambio' + '/' + id_tarea);
  }


  deleteSubTarea(id_tarea: number): Observable<any> {
    return this.http.delete<any>(this.url + 'subtarea' + '/' + id_tarea);
  }


}
