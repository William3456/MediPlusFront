import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecordComponent } from './pages/record/record.component';
import { FormsModule } from '@angular/forms';

import {ReactiveFormsModule} from "@angular/forms";
import { VerRecordComponent } from './pages/ver-record/ver-record.component';
import { GlucosaComponent } from './pages/glucosa/glucosa.component';
import { PresionComponent } from './pages/presion/presion.component';
import { VerGlucosaComponent } from './pages/ver-glucosa/ver-glucosa.component';
import { VerPresionComponent } from './pages/ver-presion/ver-presion.component';
import { CrearCitaComponent } from './pages/crear-cita/crear-cita.component';
import { VerCitaComponent } from './pages/ver-cita/ver-cita.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';
import { AppointmentDetailComponent } from './pages/appointment-detail/appointment-detail.component';
@NgModule({
  declarations: [RecordComponent, GlucosaComponent, PresionComponent, VerGlucosaComponent,
    VerPresionComponent, VerRecordComponent, CrearCitaComponent, VerCitaComponent, AppointmentDetailComponent],
  exports:[ RecordComponent, GlucosaComponent, PresionComponent, VerRecordComponent,AppointmentDetailComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule,
    AppRoutingModule,
  ]

})
export class PatientModule { }
