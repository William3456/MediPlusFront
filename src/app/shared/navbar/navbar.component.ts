import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Usuario} from "../../auth/dao/usuario";
import {Router} from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public isLogged = false;
  public rol: any =0;
  public tieneExpediente: boolean = false;
  @ViewChild('contenido', { static: false })
  modal?: ElementRef<HTMLElement>;
  constructor(private authService: AuthService, private route: Router, public modalServ: NgbModal) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
      if (localStorage.getItem('usuario') === null) {
        this.isLogged = false;
      }else{
        this.isLogged = true;
        this.rol = this.usuario.user_type;

        if(this.usuario.expediente === 1){
          this.tieneExpediente = true;
        }else{
          this.tieneExpediente= false;
        }

      }
    });
  }

  onLogout() {
    localStorage.clear();
    this.isLogged = false;
    this.route.navigate(['/login']);
    this.rol = 0;
    this.modalServ.dismissAll();
    /*this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));

    this.authService.logout(this.usuario.email).subscribe((data) => {
      if (data.codigo == 200) {

        localStorage.clear();
        this.isLogged = false;
        this.route.navigate(['/login']);
        this.rol = 0;
      } else {
        this.route.navigate(['/']);
      }
    });*/
  }

}
