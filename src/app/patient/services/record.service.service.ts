import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecordInterface } from '../dao/record';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient) { }

  crearExpediente(expediente: RecordInterface): Observable<any>{

    return this.http.post<any>(this.urlEndPoint + "expediente/crear/", expediente,{ headers: this.httpHeaders }).pipe(
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

  expedienteByEmail(email: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "expediente/email/" + email).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }
}
