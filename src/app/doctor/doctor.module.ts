import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHomeComponent } from './pages/doctor-home/doctor-home.component';



@NgModule({
  declarations: [DoctorHomeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DoctorHomeComponent
  ]
})
export class DoctorModule {

}
