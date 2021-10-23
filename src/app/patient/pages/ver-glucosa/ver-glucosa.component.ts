import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


    this.glucosService.getGlucosa().subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
        this.glucosa = response;
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

}
