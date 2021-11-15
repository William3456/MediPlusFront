import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/auth/dao/usuario';
import { GlucoseInterface } from '../../dao/gluco';
import { GlucosaService } from '../../services/glucosa.service';


@Component({
  selector: 'app-ver-glucosa',
  templateUrl: './ver-glucosa.component.html',
  styleUrls: ['./ver-glucosa.component.css']
})
export class VerGlucosaComponent implements OnInit {
  nombreUsuario: string = "";
   glucosa: any;
  iduser: any;
  glucosaData: GlucoseInterface[] = [];
  usuario: Usuario = new Usuario();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private glucosService: GlucosaService) { }

  ngOnInit(): void {

    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);

    }else{

      this.nombreUsuario = this.usuario.name;
      this.iduser = this.usuario.id;
      console.log(this.iduser);

    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
      },
    //  order:  [[ 7, "asc" ]]

    };

    this.glucosService.getGlucosa().subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
        this.glucosa = response;
        this.dtTrigger.next();
        let itera = 0;
        for(let i = 0;i< this.glucosa.length;i++){

         if (this.glucosa[i].user_id.id == this.iduser){


         // console.log(this.glucosa[i])
       this.glucosaData[itera] = this.glucosa[i];
         // console.log(fech[i]);
         itera ++;
          }
        }
        console.log(this.glucosaData);

        return;
      }
    });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
