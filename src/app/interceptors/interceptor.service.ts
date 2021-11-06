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
    var url = req.url as string;
    var splUrl = '';
    splUrl = url.split('/')[5];

    if(splUrl === 'horariosDisp'){
      return next.handle(req).pipe(
        finalize( () => {
        //Swal.close()
        })
      );
    }
    Swal.fire({
      text: 'Cargando...'
    })
    Swal.showLoading();

      return next.handle(req).pipe(
        finalize( () => {
          if(splUrl !== 'horariosDisp'){
            Swal.close()
          }
        })
      );
  }
}
