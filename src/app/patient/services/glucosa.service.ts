import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlucosaService {
  static get() {
    throw new Error('Method not implemented.');
  }

  private urlEndPoint: string = environment.baseUrl;
  private httpHeaders =  new HttpHeaders({'Content-type':'application/json'});



  constructor(private http: HttpClient, private toastr: ToastrService) { }


  getGlucosa(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "glucosa").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }
}
