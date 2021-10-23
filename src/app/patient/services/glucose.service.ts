import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlucoseInterface } from '../dao/gluco';

@Injectable({
  providedIn: 'root'
})
export class GlucoseService {
  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  crearToma(glucosa: GlucoseInterface): Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint + 'glucosa/crear/', glucosa,{ headers: this.httpHeaders }).pipe(
      catchError( e =>{
        this.toastr.error('Error interno, intente más tarde', 'Error');

        return throwError(e);
      })
    )
  }
}
