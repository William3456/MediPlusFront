import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Usuario} from "../dao/usuario";
import {Router} from "@angular/router";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    recuerdame: new FormControl(''),
  });
  private usuario: Usuario = new Usuario();

  constructor(public userService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['home']);
    }
  }

  onLogin() {
    var remember = this.loginForm.value.recuerdame != '' ? true : false;
    const credenciales = {
      usuario: this.loginForm.value.email, pass: this.loginForm.value.password,
      recuerdame: remember,
    };


    this.userService.login(credenciales).subscribe((respuesta) => {
      if(respuesta.codigo == 200){
        const userLocal = {
          id: respuesta.usuario.id,
          name: respuesta.usuario.name,
          recuerdame: respuesta.usuario.remember,
          tipo_usuario: respuesta.usuario.user_type,
          estado: respuesta.usuario.status.id
        }
        this.usuario = respuesta.usuario;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.userService.user.next(this.usuario);
        this.router.navigate(['/home']);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: respuesta.msj,
        })
      }
    });
  }
}
