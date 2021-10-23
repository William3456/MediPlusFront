import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

//import { NavbarComponent } from './../shared/navbar/navbar.component';

@NgModule({
  declarations: [HomeComponent, /*NavbarComponent*/],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartsModule,

  ]
})
export class HomeModule { }
