import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  clinicaByDepa(idDepa: number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"clinica/depa/"+idDepa).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error al obtener las clínicas, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }
}
