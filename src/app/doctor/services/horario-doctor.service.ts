import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioDoctorService {
  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private toastr: ToastrService) { }

/*
  AddHorarioDoctor(expediente: HorarioDocInterface): Observable<any>{

    return this.http.post<any>(this.urlEndPoint + "Horario/crear/", expediente,{ headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error interno, intente más tarde', 'Error');

        return throwError(e);
      })
    );
  }

  HorarioDoctor(horario: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "horario/id/" + horario).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );

}
*/
}
