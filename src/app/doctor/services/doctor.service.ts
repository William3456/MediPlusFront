import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HorarioDocInterface } from '../dao/HorarioDoctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private toastr: ToastrService) { }


  doctoreByEmail(email: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "doctor/email/" + email).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

 getPatienById(id: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "users/userid/" + id).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }


  getAppointment(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "doctor/appointment").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }



}
