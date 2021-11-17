import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { PressureService } from '../../services/pressure.service';
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
    comentario: new FormControl('')
  });
  fechaPicker = '';
  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";
  fechaActual = new Date();
  @ViewChild('contenido', { static: false })
  modal?: ElementRef<HTMLElement>;

  constructor(private router: Router, private formBuilder: FormBuilder,
     private el: ElementRef, private toastr: ToastrService, private pressureService: PressureService,
     private modalServ: NgbModal) { }

  ngOnInit(): void {
    console.log(this.modal);
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.pressureForm = this.formBuilder.group({
        sistolica : ['', [ Validators.required ]],
        diastolica : ['', [ Validators.required ]],
        cardiaco : ['', [ Validators.required ]],
        horaMedicion : ['', [ Validators.required ]],
        fechaMedicion : ['', [ Validators.required ]],
        comentario: ['',[]]
      });
      this.nombreUsuario = this.usuario.name;
    }
    this.fechaPicker = this.fechaActual.getFullYear() + '-' +
    ("0" + (this.fechaActual.getMonth() + 1)).slice(-2) + '-' +
    ("0" + this.fechaActual.getDate()).slice(-2);
  }

  get f(){ return this.pressureForm.controls }

  guardarTomPres(){
    this.submitted = true;
    const invalidControl = this.el.nativeElement.querySelector('.is-invalid');
    if(this.pressureForm.invalid){
      this.toastr.error('Debe completar uno o más campos', 'Error');
      return
    }
    const pressure = {
      systolic_pressure :  this.pressureForm.value.sistolica,
      diastolic_pressure : this.pressureForm.value.diastolica,
      heart_rate: this.pressureForm.value.cardiaco,
      date: this.pressureForm.value.fechaMedicion,
      time: this.pressureForm.value.horaMedicion + ':00',
      user_id:{
        id: this.usuario.id
      },
      status:{
        id: 1
      },
      comments: this.pressureForm.value.comentario
    }
    this.pressureService.crearToma(pressure).subscribe(response =>{
      console.log(response);
      if(response.status === 200){
        this.toastr.success('Datos guardados correctamente', 'Operación exitosa');
        if(pressure.systolic_pressure > 139 || pressure.diastolic_pressure > 89 || pressure.heart_rate > 100){
          this.modalServ.open(this.modal);
        }
        this.router.navigate(['/home']);
      }else{
        this.toastr.error('Error', 'Error al guardar los datos');
      }
    })
  }

}
