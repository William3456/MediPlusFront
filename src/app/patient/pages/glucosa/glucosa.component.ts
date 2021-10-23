import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { GlucoseService } from '../../services/glucose.service';

@Component({
  selector: 'app-glucosa',
  templateUrl: './glucosa.component.html',
  styleUrls: ['./glucosa.component.css']
})
export class GlucosaComponent implements OnInit {

  glucoForm = new FormGroup({
    nivGlucosa : new FormControl(''),
    uMedida : new FormControl(''),
    horaMedicion : new FormControl(''),
    fechaMedicion : new FormControl(''),
  });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder,
     private el: ElementRef, private toastr: ToastrService, private glucoseService: GlucoseService) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.glucoForm = this.formBuilder.group({
        nivGlucosa : ['', [ Validators.required ]],
        uMedida : ['', [ Validators.required ]],
        horaMedicion : ['', [ Validators.required ]],
        fechaMedicion : ['', [ Validators.required ]],
      });
      this.nombreUsuario = this.usuario.name;
    }

  }

  get f(){ return this.glucoForm.controls }

  guardarTomGluco(){
    this.submitted = true;
    const invalidControl = this.el.nativeElement.querySelector('.is-invalid');
    if(this.glucoForm.invalid){
      this.toastr.error('Debe completar uno o más campos', 'Error');
      return
    }

    const glucosa = {
      measure: this.glucoForm.value.nivGlucosa,
      units:{
          id: this.glucoForm.value.uMedida,
        },
        date: this.glucoForm.value.fechaMedicion,
        time: this.glucoForm.value.horaMedicion + ':00',
        user_id:{
          id: this.usuario.id
        },
        status:{
          id: 1
        }
    }
    console.log(glucosa);
    this.glucoseService.crearToma(glucosa).subscribe(response => {
      console.log(response);
      if(response.status === 200){
        this.toastr.success('Datos guardados correctamente', 'Operación exitosa');
        this.router.navigate(['/home']);
      }else{
        this.toastr.error('Error', 'Error al guardar los datos');
        console.log(response);
      }
    })
  }

}
