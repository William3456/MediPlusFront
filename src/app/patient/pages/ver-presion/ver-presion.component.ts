import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
 p: number = 1;
  constructor(private router: Router, private presionService: PressureService) { }

  ngOnInit(): void {

  this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
  if (localStorage.getItem('usuario') == undefined) {
    this.router.navigate(['login']);

  }else{

    this.nombreUsuario = this.usuario.name;
    this.iduser = this.usuario.id;
    console.log(this.iduser);

  }


  this.presionService.ObtenerPressure().subscribe((response: any)=>{
    if(response.status !== 404){
      //console.log(this.usuario.id);
      this.presion = response;
      let itera = 0;
      for(let i = 0;i< this.presion.length;i++){

       if (this.presion[i].user_id.id == this.iduser){


       // console.log(this.glucosa[i])
     this.presionData[itera] = this.presion[i];
       // console.log(fech[i]);
       itera ++;
        }
      }
      console.log(this.presionData);

      return;
    }
  });

}
}
