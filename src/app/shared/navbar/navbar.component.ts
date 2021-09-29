import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Usuario} from "../../auth/dao/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public isLogged = false;

  constructor(private authService: AuthService, private route: Router) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
      if (localStorage.getItem('usuario') === null) {
        this.isLogged = false;
      }else{
        this.isLogged = true;
      }
    });
  }

  onLogout() {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    console.log(this.usuario);
    this.authService.logout(this.usuario.email).subscribe((data) => {
      if (data.codigo == 200) {
        console.log(data);
        localStorage.clear();
        this.isLogged = false;
        this.route.navigate(['/login']);
      } else {
        this.route.navigate(['/']);
      }
    });
  }

}
