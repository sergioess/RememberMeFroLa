import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  // url: string = 'https://remembermebackend.herokuapp.com/api/';
  // url: string = 'http://localhost:8000/api/';
  url: string = 'https://www.trattoria.com.co/apirem/api/';


  items: Usuario[] = [];

  getUsuarios(): Observable<Usuario[]> {
    // console.log(this.http.get<Usuario[]>(this.url + '/usuario'))
    // return this.items;
    return this.http.get<Usuario[]>(this.url + 'usuarios');

  }

  getUsuariosById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + 'usuarios' + '/' + id);

  }


  getUsuarioByCorreo(data: Usuario): Observable<any> {
    // console.log(data);
    return this.http.post(this.url + 'usuariosemail', data);

  }


  getUsuarioByCorreoUser(email: string): Observable<Usuario> {
    // console.log(email);
    return this.http.get<Usuario>(this.url + 'usuariosemail/' + email);

  }

  // getUsuarioByCorreo(email: string): Observable<Usuario[]> {
  //   console.log(email);
  //   return this.http.get<Usuario[]>(this.url + 'usuariosemail' + '/' + email);

  // }

  updateUsuario(id: number, data: Usuario): Observable<any> {
    return this.http.put(this.url + 'usuarios' + '/' + id, data, this.httpOptions);
  }

  createUsuario(data: Usuario): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'usuarios/', data, this.httpOptions);
  }


  isAuthenticated(): boolean {
    // console.log("Esta logueado : " + localStorage.getItem('isLoggedIn'));
    return (localStorage.getItem('isLoggedIn') === "true") ? true : false;
  };



}
