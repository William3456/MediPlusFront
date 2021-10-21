import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of, Observable, BehaviorSubject, throwError} from 'rxjs';
import {Usuario} from "../dao/usuario";
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.baseUrl;
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  login(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    /*Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'error de servidor, intente más tare.',
      didOpen: () => {
        Swal.showLoading()
      }
    });*/
    return this.http.post(this.url + "login", user, {headers: headers}).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error interno, intente más tarde', 'Error');
        return throwError(e);
      })
    );
  }

  register() {

  }

  logout(id: any): Observable<any> {
    return this.http.get<Usuario>(this.url + 'login/logout/' + id);
  }

  getCurrentUser(idUsuario: any): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + "login/getUser/" + idUsuario);
  }
}
