import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './pages/record/record.component';
import { FormsModule } from '@angular/forms';

import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [RecordComponent],
  exports:[ RecordComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
