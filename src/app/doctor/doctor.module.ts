import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHomeComponent } from './pages/doctor-home/doctor-home.component';
import { CrearHorarioComponent } from './pages/crear-horario/crear-horario.component';
import { VerPerfilComponent } from './pages/ver-perfil/ver-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [DoctorHomeComponent, CrearHorarioComponent, VerPerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    DoctorHomeComponent
  ]
})
export class DoctorModule {

}
