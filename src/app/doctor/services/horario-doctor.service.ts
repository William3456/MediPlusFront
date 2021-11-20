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
export class HorarioDoctorService {
  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private toastr: ToastrService) { }


  crearHorarioDoctor(horarioDoc: HorarioDocInterface): Observable<any>{
    return this.http.post<any>(this.urlEndPoint + 'doctorHorario/crear', horarioDoc,{ headers: this.httpHeaders }).pipe(
      catchError( e =>{
        this.toastr.error('Error interno, intente más tarde', 'Error');

        return throwError(e);
      })
    )
  }
  getHorarioDoctor(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "doctor/schedule").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }
  getHorarioById(id: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "doctor/schedule/doctor/" + id).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }


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
  horarioDispByFechaDoc(idDoctor: number, fecha: any){
    return this.http.get<any>(this.urlEndPoint+"horariosCita/"+idDoctor + '/'+fecha).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error al obtener los horarios, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }

  getClinicSchedule(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "clinicschedule").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  crearDetalle(detalle: detalleExpeInterface): Observable<any>{
    return this.http.post<any>(this.urlEndPoint + 'detalle/crear', detalle,{ headers: this.httpHeaders }).pipe(
      catchError( e =>{
        this.toastr.error('Error interno, intente más tarde', 'Error');

        return throwError(e);
      })
    )
  }

  updateStatusCita(idCita: number, Status: number){
    return this.http.get<any>(this.urlEndPoint+"cita/actualizaEstado/"+idCita+'/'+Status+'/'+2).pipe(
      catchError(e => {
        console.error(e);
        this.toastr.error('Error al actualizar el estado, intente más tarde', 'Error');
        return throwError(e);
      })
    )
  }
}
