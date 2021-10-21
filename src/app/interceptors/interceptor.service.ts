import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    Swal.fire({
      text: 'Cargando...'
    })
    Swal.showLoading();
      return next.handle(req).pipe(

        /*catchError(error => {

          if (error instanceof ErrorEvent) {
            // client-side error
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'error, intente más tare.',
            })
          } else {
            // backend error
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'error de servidor, intente más tare.',
            })

          }

          console.log("f");
          // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.

          //Swal.close()
        return throwError(error);
          //return throwError(errorMessage);
        }),*/
        finalize( () => {
          Swal.close()
        })
      );
  }
}
