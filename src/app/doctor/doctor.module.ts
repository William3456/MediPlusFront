import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHomeComponent } from './pages/doctor-home/doctor-home.component';
import { CrearHorarioComponent } from './pages/crear-horario/crear-horario.component';
import { VerPerfilComponent } from './pages/ver-perfil/ver-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DetailPatientComponent } from './pages/detail-patient/detail-patient.component';
import { ChartsModule } from 'ng2-charts';
import { DataTablesModule } from 'angular-datatables';
import { VerHorariosComponent } from './pages/ver-horarios/ver-horarios.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [DoctorHomeComponent, CrearHorarioComponent, VerPerfilComponent, DetailPatientComponent,VerHorariosComponent, MedicalRecordsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ChartsModule,
    DataTablesModule,
    AppRoutingModule,
  ],
  exports: [
    DoctorHomeComponent,
    MedicalRecordsComponent
  ]
})
export class DoctorModule {

}
