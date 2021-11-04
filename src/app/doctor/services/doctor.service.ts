import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  doctorByClinica(idClinica: number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"doctor/clinica/"+idClinica).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error al obtener los doctores, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }
}
