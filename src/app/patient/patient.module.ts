import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './pages/record/record.component';
import { FormsModule } from '@angular/forms';

import {ReactiveFormsModule} from "@angular/forms";
import { VerRecordComponent } from './pages/ver-record/ver-record.component';
@NgModule({
  declarations: [RecordComponent, VerRecordComponent],
  exports:[ RecordComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
