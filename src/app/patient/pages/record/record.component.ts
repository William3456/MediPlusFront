import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/dao/usuario';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { RecordService } from '../../services/record.service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  recordForm = new FormGroup({
    fNacimiento: new FormControl(''),
    fName: new FormControl(''),
    edadActual: new FormControl(''),
    direccion: new FormControl(''),
    tipoId: new FormControl(''),
    numId: new FormControl(''),
    peso: new FormControl(''),
    altura: new FormControl(''),
    genero: new FormControl(''),
    profesion: new FormControl(''),
    terminos: new FormControl(''),
    telefono: new FormControl(''),
  });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";
  date: any;


  constructor(private router: Router,private formBuilder: FormBuilder,
    private recordService: RecordService, private el: ElementRef, private toastr: ToastrService,
    private userService: AuthService) { }

  get f(){ return this.recordForm.controls }

  ngOnInit(): void {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      if(this.usuario.user_type != 1){
        this.router.navigate(['home']);
        return;
      }

      this.recordService.expedienteByEmail(this.usuario.email).subscribe((response)=>{
        if(response.id !== 0){
          this.router.navigate(['home']);
          return;
        }
        console.log(response);
      });

      this.recordForm = this.formBuilder.group({
        direccion: ['', [ Validators.required, Validators.minLength(15) ]],
        fNacimiento: ['', [ Validators.required]],
        tipoId: ['', [ Validators.required]],
        numId: ['', [ Validators.required]],
        peso: ['', [ Validators.required]],
        altura: ['', [ Validators.required]],
        genero: ['', [ Validators.required]],
        profesion: ['', [ Validators.required]],
        telefono: ['', [ Validators.required]],
        fName:  ['', []],
        terminos:  ['', []],
        edadActual:  ['', []],
      });
      this.router.navigate(['/patient/record/new']);
      this.nombreUsuario = this.usuario.name;
      this.recordForm.patchValue({
        fName: this.nombreUsuario,
      });


    }
  }
  calculaEdad(){
    let date = new Date();
    let fnaci = this.recordForm.value.fNacimiento;
    //Nacimiento
    let yearN = fnaci.split("-")[0];
    let mesN = fnaci.split("-")[1];
    let diaN = fnaci.split("-")[2];

    //Fecha actual
    let year = date.getFullYear();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;

    var todayDate=new Date();
    var ageyear = todayDate.getFullYear() - fnaci.split("-")[0];
    var agemonth = todayDate.getMonth() - fnaci.split("-")[1];
    var ageday = todayDate.getDate() - fnaci.split("-")[2];

    if (agemonth <= 0) {
      ageyear--;
      agemonth = (12 + agemonth);
    }
    if (dia < diaN) {
      agemonth--;
      ageday = 30 + ageday;
    }  if (agemonth == 12) {
      ageyear = ageyear + 1;
      agemonth = 0;
    }
    //console.log(ageyear);

    this.recordForm.patchValue({
      edadActual: ageyear,
    });
  }
  guardaExpediente(){
    this.submitted = true;
    const invalidControl = this.el.nativeElement.querySelector('.is-invalid');
    if(this.recordForm.invalid){

      return
    }
    const expediente = {
      address: this.recordForm.value.direccion,
      date_birth: this.recordForm.value.fNacimiento,
      gender: this.recordForm.value.genero,
      height: this.recordForm.value.altura,
      num_id: this.recordForm.value.numId,
      phone: this.recordForm.value.telefono,
      profession: this.recordForm.value.profesion,
      weight: this.recordForm.value.peso,
      identification_id:{
        id: this.recordForm.value.tipoId
      },
      status:{
        id: 1
      },
      user_id: {
        id: this.usuario.id
      },
    }
    //console.log(expediente);

    this.recordService.crearExpediente(expediente).subscribe((response) =>{
      console.log(response);
      if(response.status === 200){
        this.toastr.success('Expediente creado correctamente', 'Operación exitosa');
        this.router.navigate(['/home']);
        this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
        this.usuario.expediente = 1;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.userService.user.next(this.usuario);
      }else{
        this.toastr.error('Error', 'Error al crear el expediente');
        console.log(response);
      }
    });
  }

}
