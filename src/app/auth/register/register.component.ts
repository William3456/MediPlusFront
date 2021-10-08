import {Component, OnInit, ElementRef} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../dao/usuario';
import { RegisterService } from './register.service';
declare let alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });
  submitted = false;

  public usuario: Usuario = new Usuario();

  constructor(private registerService: RegisterService,
    private router: Router, private formBuilder: FormBuilder, private el: ElementRef) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:['', [ Validators.required, Validators.minLength(5) ]],
      email:['', [ Validators.required, Validators.email ]],
      password:['', [Validators.required]],
      password2:['',[Validators.required]],
    });
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') != undefined) {
      this.router.navigate(['home']);
    }
  }
  get f(){ return this.registerForm.controls }

  onRegister() {
    this.submitted = true;
    const invalidControl = this.el.nativeElement.querySelector('.is-invalid');
    if(this.registerForm.invalid){
      if (invalidControl) {
        invalidControl.focus();
      }
      return
    }
    let pass = this.registerForm.value.password;
    let passConf = this.registerForm.value.password2;
    let passConfirm = document.getElementById("passConfirm");
    if(pass != passConf){
      alertify.error('Contraseñas no coinciden');
      this.f.password2.reset();
      passConfirm?.focus();
      return;
    }else{
      const usuario = {
        id:0,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.utf8_to_b64(this.registerForm.value.password),
        remember: 0,
        user_type: 1,
        status: {
          id: 1,
          description: "",
        },
        created_at: null
      }

      this.usuario = usuario;
      //console.log(this.usuario);
      const httpRes =

      this.registerService.create(this.usuario).subscribe((response)=>{

        console.log(response);
        if(response.status === 200){
          this.usuario = response.body;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario ' + this.usuario.name + ' Creado',
          });
          this.router.navigate(['/login']);
          this.registerForm.reset();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'No se pudo crear el usuario, intente más tarde',
          });
        }
      });
    }

  }
  utf8_to_b64( str: string ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }

}
