import { Component,OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/auth/dao/usuario';
import { PressureInterface } from '../../dao/pressure';
import { PressureService } from '../../services/pressure.service';

@Component({
  selector: 'app-ver-presion',
  templateUrl: './ver-presion.component.html',
  styleUrls: ['./ver-presion.component.css']
})
export class VerPresionComponent implements OnInit {
  nombreUsuario: string = "";
  presion: any;
 iduser: any;
 presionData: PressureInterface[] = [];
 usuario: Usuario = new Usuario();

 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private presionService: PressureService) { }


  ngOnInit(): void {

  this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
  if (localStorage.getItem('usuario') == undefined) {
    this.router.navigate(['login']);

  }else{

    this.nombreUsuario = this.usuario.name;
    this.iduser = this.usuario.id;


  }
  this.dtOptions = {
    pagingType: 'full_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
    },
    //order:  [[ 7, "asc" ]]

  };

  this.presionService.ObtenerPressure().subscribe((response: any)=>{
    if(response.status !== 404){
      //console.log(this.usuario.id);
      this.presion = response;
      this.dtTrigger.next();
      let itera = 0;
      for(let i = 0;i< this.presion.length;i++){

       if (this.presion[i].user_id.id == this.iduser){


       // console.log(this.glucosa[i])
     this.presionData[itera] = this.presion[i];
       // console.log(fech[i]);
       itera ++;
        }
      }


      return;
    }
  });


}
ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
}
