import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { DoctorInterface, IdentificationID } from '../../dao/Doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})

export class VerPerfilComponent implements OnInit {

  doctorForm = new FormGroup({
    especialidad: new FormControl(''),
    fName: new FormControl(''),
    edadActual: new FormControl(''),
    num_reg: new FormControl(''),
    tipoId: new FormControl(''),
    numId: new FormControl(''),
  });

  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();
  constructor(private router: Router,private formBuilder: FormBuilder,
     private el: ElementRef, private toastr: ToastrService,
     public datepipe: DatePipe, private doctorService: DoctorService) { }

     doctor: DoctorInterface = new DoctorInterface();

     doctorData: any;

     submitted = false;
     get f(){ return this.doctorForm.controls }

  ngOnInit(): void {

    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{
      this.nombreUsuario = this.usuario.name;
      if(this.usuario.user_type == 2){
       // this.router.navigate(['doctor/home'])
        this.nombreUsuario = this.usuario.name;
        this.doctorService.doctoreByEmail(this.usuario.email).subscribe((response)=>{
          if(response.status !== 404){
            this.doctorData = response;
            this.doctorForm.patchValue({
              fName: this.usuario.name,
              especialidad: this.doctorData.speciality,
              numId: this.doctorData.num_id,
              tipoId: this.doctorData.identification_id.description,
              num_reg: this.doctorData.num_reg_doc,
            });
          }
        });

      }else {
        this.router.navigate(['home']);

      }
  }
  }
}
