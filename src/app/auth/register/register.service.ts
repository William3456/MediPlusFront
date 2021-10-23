import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../dao/usuario';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  create(usuario: Usuario) : Observable<any>{

    return this.http.post<any>(this.urlEndPoint + "users/crear", usuario,{ headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error interno, intente más tarde', 'Error');
        return throwError(e);
      })
    );
  }
}
