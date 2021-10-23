import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './pages/record/record.component';
import { FormsModule } from '@angular/forms';

import {ReactiveFormsModule} from "@angular/forms";
import { VerRecordComponent } from './pages/ver-record/ver-record.component';
import { GlucosaComponent } from './pages/glucosa/glucosa.component';
import { PresionComponent } from './pages/presion/presion.component';
import { VerGlucosaComponent } from './pages/ver-glucosa/ver-glucosa.component';
import { VerPresionComponent } from './pages/ver-presion/ver-presion.component';
@NgModule({
  declarations: [RecordComponent, GlucosaComponent, PresionComponent, VerGlucosaComponent, VerPresionComponent],
  exports:[ RecordComponent, GlucosaComponent, PresionComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class PatientModule { }
