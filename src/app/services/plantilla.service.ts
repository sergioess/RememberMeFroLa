import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PlantillaCrea } from '../models/plantilla-crea';
import { Plantilla } from '../models/plantilla';
import { PlantillaSubTarea } from '../models/plantilla-sub-tarea';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json'
    })
  };


  constructor(private http: HttpClient) { }


  // url: string = 'https://www.trattoria.com.co/apirem/api/';
  url: string = 'http://localhost:8000/api/';


  getPlantillas(id_usuario: number): Observable<Plantilla[]> {
    // console.log(this.http.get<Tarea[]>(this.url + '/tareas'))
    // return this.items;
    return this.http.get<Plantilla[]>(this.url + 'plantilla' + '/' + id_usuario);

  }

  createPlantilla(data: PlantillaCrea): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(data);

    return this.http.post(this.url + 'plantilla', data, this.httpOptions);
  }

  createPlantillaSubTareas(data: PlantillaSubTarea): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(data);

    return this.http.post(this.url + 'subtareaplantilla', data, this.httpOptions);
  }

}
