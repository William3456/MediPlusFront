import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientModule } from './patient/patient.module';
import { HomeModule } from './home/home.module';
import { InterceptorService } from './interceptors/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DoctorModule } from './doctor/doctor.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PatientModule,
    HomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DoctorModule,
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    DatePipe
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
