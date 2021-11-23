import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { detalleExpInterface } from 'src/app/patient/dao/detalleExpediente';
import { environment } from 'src/environments/environment';
import { detalleExpeInterface } from '../dao/DetalleExp';
import { HorarioDocInterface } from '../dao/HorarioDoctor';

@Injectable({
  providedIn: 'root'
})
export class RecordsDetailService {
  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  obtenerDetailByPac(idPaciente:number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + 'expediente/record/detail/'+idPaciente).pipe(
      catchError( e =>{
        this.toastr.error('Error al obtener los detalles, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }

}
