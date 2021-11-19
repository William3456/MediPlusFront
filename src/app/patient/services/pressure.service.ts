import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PressureInterface } from '../dao/pressure';

@Injectable({
  providedIn: 'root'
})
export class PressureService {
  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private httpClient: HttpClient, private toastr: ToastrService ) {}

  crearToma(presion: PressureInterface): Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint + 'presion/crear', presion,{ headers: this.httpHeaders }).pipe(
      catchError( e =>{
        this.toastr.error('Error interno, intente más tarde', 'Error');

        return throwError(e);
      })
    )
  }

  ObtenerPressure(): Observable<any>{
    return this.httpClient.get<any>(this.urlEndPoint + "presion").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  getPressureById(id: any): Observable<any>{
    return this.httpClient.get<any>(this.urlEndPoint + "presion/user/" + id).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

}
