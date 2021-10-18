import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/dao/usuario';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  recordForm = new FormGroup({
    fNacimiento: new FormControl(''),
    fName: new FormControl(''),
    edadActual: new FormControl(),
  });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";
  date: any;


  constructor(private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['/patient/record/new']);
      this.nombreUsuario = this.usuario.name;
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
    console.log(ageyear);
    this.recordForm.value.edadActual = ageyear;
  }

}
