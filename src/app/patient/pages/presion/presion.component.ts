import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
@Component({
  selector: 'app-presion',
  templateUrl: './presion.component.html',
  styleUrls: ['./presion.component.css']
})
export class PresionComponent implements OnInit {

  pressureForm = new FormGroup({
    nivGlucosa : new FormControl(''),
    uMedida : new FormControl(''),
    horaMedicion : new FormControl(''),
    fechaMedicion : new FormControl(''),
  });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder,
     private el: ElementRef, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  get f(){ return this.pressureForm.controls }

  guardarTomPres(){

  }
}
