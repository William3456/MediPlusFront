import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './pages/record/record.component';
import { FormsModule } from '@angular/forms';

import {ReactiveFormsModule} from "@angular/forms";
<<<<<<< HEAD
import { VerRecordComponent } from './pages/ver-record/ver-record.component';
@NgModule({
  declarations: [RecordComponent, VerRecordComponent],
  exports:[ RecordComponent ],
=======
import { GlucosaComponent } from './pages/glucosa/glucosa.component';
import { PresionComponent } from './pages/presion/presion.component';
@NgModule({
  declarations: [RecordComponent, GlucosaComponent, PresionComponent],
  exports:[ RecordComponent, GlucosaComponent, PresionComponent ],
>>>>>>> origin/wlazo
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
