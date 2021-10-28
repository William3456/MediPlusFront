import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import { RecordComponent } from './patient/pages/record/record.component';
import { GlucosaComponent } from './patient/pages/glucosa/glucosa.component';
import { PresionComponent } from './patient/pages/presion/presion.component';
import { VerRecordComponent } from './patient/pages/ver-record/ver-record.component';
import { VerGlucosaComponent } from './patient/pages/ver-glucosa/ver-glucosa.component';
import { VerPresionComponent } from './patient/pages/ver-presion/ver-presion.component';
import { CrearCitaComponent } from './patient/pages/crear-cita/crear-cita.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'patient/record/new',
    component: RecordComponent

  }, {
    path: 'patient/verRecord',
    component: VerRecordComponent

  },{
    path: 'patient/gluco/new',
    component: GlucosaComponent
  },
  {
    path: 'patient/ver-glucosa',
    component: VerGlucosaComponent
  },
  {
    path: 'patient/ver-presion',
    component: VerPresionComponent
  },
  {
    path: 'patient/pressure/new',
    component: PresionComponent
  },
  {
    path: 'patient/appointment/new',
    component: CrearCitaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
