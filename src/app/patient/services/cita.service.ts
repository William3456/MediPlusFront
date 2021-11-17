import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CitaInterface } from '../dao/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  horarioDispByFechaDoc(idDoctor: number, fecha: string, horaIni: any, horaFin: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"cita/horariosDisp/"+idDoctor + '/'+ fecha + '/'+ horaIni + '/'+ horaFin).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error al obtener información, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }
  crearCita(cita: CitaInterface): Observable<any>{
    return this.http.post<any>(this.urlEndPoint + 'cita/crear/', cita,{ headers: this.httpHeaders }).pipe(
      catchError( e =>{
        this.toastr.error('Error al crear la cita, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }
  obtenerCitasPorPaciente(idPaciente:number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + 'cita/paciente/'+idPaciente).pipe(
      catchError( e =>{
        this.toastr.error('Error al obtener las citas, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }
  obtenerDetalleCita(idCita:number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + 'expediente/cita/detalle/'+idCita).pipe(
      catchError( e =>{
        this.toastr.error('Error al obtener las citas, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }
}
