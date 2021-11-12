import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/auth/dao/usuario';
import { CitaInterface } from '../../dao/cita';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-ver-cita',
  templateUrl: './ver-cita.component.html',
  styleUrls: ['./ver-cita.component.css']
})
export class VerCitaComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  usuario: Usuario = new Usuario();
  cita: CitaInterface[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private citaService: CitaService, private router: Router,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{
      if(this.usuario.user_type != 1){
        this.router.navigate(['home']);
        return;
      }
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
      },
      order:  [[ 7, "asc" ]]

    };

    this.citaService.obtenerCitasPorPaciente(this.usuario.id).subscribe((response)=>{
      if(response.status !== 404){
        this.cita = response;
        this.dtTrigger.next();
      }
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
