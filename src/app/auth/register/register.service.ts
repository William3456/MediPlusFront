import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../dao/usuario';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private urlEndPoint: string = 'http://localhost:8000/api/users/';
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});
  constructor(private http: HttpClient) { }

  create(usuario: Usuario) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint + "crear", usuario,{ headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'error de servidor, intente más tare.',
        })
        return throwError(e);
      })
    );
  }
}
