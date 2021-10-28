import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,
    private el: ElementRef, private toastr: ToastrService) { }

  pressureForm = new FormGroup({
  });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";

  ngOnInit(): void {

  }
  get f(){ return this.pressureForm.controls }

  agendarCita(){

  }
}
