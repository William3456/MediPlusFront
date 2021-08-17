import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of, Observable, BehaviorSubject} from 'rxjs';
import {Usuario} from "../dao/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "http://localhost:8000/api/";
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  login(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    return this.http.post(this.url + "login", user, {headers: headers})
  }

  register() {

  }

  logout(emailUsuario: any): Observable<any> {
    return this.http.get<Usuario>(this.url + 'login/logout/' + emailUsuario);
  }

  getCurrentUser(idUsuario: any): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + "login/getUser/" + idUsuario);
  }
}
