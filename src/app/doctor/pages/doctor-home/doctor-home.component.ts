import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/dao/usuario';
import { CitasDocInterface, user_id } from '../../dao/CitasDoctor';
import { DoctorService } from '../../services/doctor.service';
import { UserID, ID } from '../../../patient/dao/doctor';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();
  horario = false;
  appoitment: any;
  citasData:  CitasDocInterface[] = [];

  constructor(private router: Router, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{

      this.doctorService.getAppointment().subscribe((response: any)=>{

        if(response.status !== 404){
         this.horario = true
         this.appoitment = response;
         let itera = 0;

         for(let i = 0;i<this.appoitment.length;i++){

           if(this.usuario.id == this.appoitment[0].doctor_id.user_id.id){

            this.citasData[itera] = this.appoitment[i];
            console.log(this.citasData[itera])
            itera ++;
           }

         }
          //console.log(this.usuario.id);




        }
      });

/*
      for(let i = this.glucosa.length;i>0;i--){
        if (this.glucosa[i-1].user_id.id == this.iduser){
         if(itera>0){
         this.fech.push(this.glucosa[i-1].date);
         this.GlucosaData.push(this.glucosa[i-1].measure);
        }
         itera --;
         }
       }
       */


    }
  }

}
