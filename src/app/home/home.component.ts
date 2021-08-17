import {Component, OnInit} from '@angular/core';
import {Usuario} from "../auth/dao/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();

  constructor(private router: Router) {
  }

  ngOnInit(): void {

    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['home']);
      this.nombreUsuario = this.usuario.nombre + ' ' + this.usuario.apellido;
    }
  }

}
