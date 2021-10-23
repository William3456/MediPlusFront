import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/dao/usuario';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { RecordService } from '../../services/record.service.service';
import { ToastrService } from 'ngx-toastr';
import { RecordInterface } from '../../dao/record';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ver-record',
  templateUrl: './ver-record.component.html',
  styleUrls: ['./ver-record.component.css']
})
export class VerRecordComponent implements OnInit {
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

    telefono: new FormControl(''),
  });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";


  record: RecordInterface = new RecordInterface();;

  constructor(private router: Router,private formBuilder: FormBuilder,
    private recordService: RecordService, private el: ElementRef, private toastr: ToastrService,
    public datepipe: DatePipe) { }

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
      this.nombreUsuario = this.usuario.name;
      this.recordService.expedienteByEmail(this.usuario.email).subscribe((response)=>{
        if(response.status !== 404){

          this.record = response;
          console.log(this.record.user_id.email);

          let fechaNaci = this.record.date_birth


          const fechaFormateada = this.datepipe.transform(fechaNaci, 'yyyy-MM-dd');

          this.recordForm.patchValue({
            fName: this.record.user_id.email,
            fNacimiento: fechaFormateada,
            direccion: this.record.address,
            tipoId: this.record.identification_id.description,
            numId: this.record.num_id,
            telefono:this.record.phone,
            peso: this.record.weight,
            altura: this.record.height,
            genero: this.record.gender,
            profesion: this.record.profession,
          });
          this.calculaEdad();
          //this.router.navigate(['patient/verRecord']);
          //return;
        }
      });

      //this.router.navigate(['/patient/record/new']);

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
        this.toastr.success('Expediente creado correctamento', 'Operación exitosa');
        this.router.navigate(['/home']);
      }else{
        this.toastr.error('Error', 'Error al crear el expediente');
        console.log(response);
      }
    });
  }

}
