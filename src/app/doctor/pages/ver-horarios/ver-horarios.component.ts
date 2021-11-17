import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { DoctorService } from '../../services/doctor.service';
import { HorarioDoctorService } from '../../services/horario-doctor.service';
import { Status } from '../../../patient/dao/record';
import { Subject } from 'rxjs';
import { HorarioDocInterface } from '../../dao/HorarioDoctor';

@Component({
  selector: 'app-ver-horarios',
  templateUrl: './ver-horarios.component.html',
  styleUrls: ['./ver-horarios.component.css']
})
export class VerHorariosComponent implements OnInit {

  horarioDoc: any;
  horaDoc: any ;
  idDoctor: any;
  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private router: Router, private formBuilder: FormBuilder,
    private el: ElementRef, private toastr: ToastrService, private doctorservice: DoctorService,
    private horarioDocService: HorarioDoctorService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
      },
 //  order:  [[ 7, "asc" ]]
    };

    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{

      this.doctorservice.doctoreByEmail(this.usuario.email).subscribe((Response: any)=>{
        this.idDoctor = Response.id;
       this.obtenerHorarios();
      })

}
  }
obtenerHorarios(){
  this.horarioDocService.getHorarioById(this.idDoctor).subscribe((response: any)=>{
    if(response.status !== 404){
      this.horarioDoc     = response
      this.dtTrigger.next();

    }
  });

}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
