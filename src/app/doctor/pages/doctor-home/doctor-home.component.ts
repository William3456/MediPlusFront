import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/dao/usuario';
import { CitasDocInterface, user_id } from '../../dao/CitasDoctor';
import { DoctorService } from '../../services/doctor.service';
import { UserID, ID } from '../../../patient/dao/doctor';
import { RecordService } from '../../../patient/services/record.service.service';
import { Subject } from 'rxjs';

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
   dateDay = new Date().getDay();
  citasData:  CitasDocInterface[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private doctorService: DoctorService) {

  }

  ngOnInit(): void {
    console.log(this.dateDay);
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{

      this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
        },
      //  order:  [[ 7, "asc" ]]

      };

      this.doctorService.getAppointment().subscribe((response: any)=>{

        if(response.status !== 404){
         this.horario = true
         this.appoitment = response;
         this.dtTrigger.next();

         let itera = 0;

         for(let i = 0;i<this.appoitment.length;i++){

           if(this.usuario.id == this.appoitment[i].doctor_id.user_id.id && this.appoitment[i].status.id == 1){

            this.citasData[itera] = this.appoitment[i];
            console.log(this.citasData[itera])
            itera ++;
           }

         }
          //console.log(this.usuario.id);
        }
      });

    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
