import {Component, OnInit} from '@angular/core';
import {Usuario} from "../auth/dao/usuario";
import {Router} from "@angular/router";
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { GlucosaService } from '../patient/services/glucosa.service';
import { Glucosa, UserID } from '../patient/dao/glucosa';
import { BarChartModule } from '@swimlane/ngx-charts';
import { PressureService } from '../patient/services/pressure.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();
  glucosa: any;
  presion: any;
  valorGlucosa: string = "N/A";
  Medidaglucosa: string = "N/A";
  FechaGlucosa: string = "N/A";
  FechaPresion: string = "N/A";
  Vsystolic_pressure: string = "N/A";
  Vdiastolic_pressure: string = "N/A";
  Vheart_rate: string = "N/A";

  iduser: any;
  fech: string[] = [];
  fechP: string[] = [];
  Label: any;
  GlucosaData:  any[] = [];
  systolic_pressureData: any[] = [];
  diastolic_pressureData: any[] = [];
  heart_rateData: any[] =[];

 fechas: string[]= [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };


public barChartData: ChartDataSets[] = [
  { data: this.GlucosaData, label: 'Tomas de Glucosa' },
 // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];

public barChartDataPresion: ChartDataSets[] = [
  { data: this.systolic_pressureData, label: 'Tomas de sistólica' },
  { data: this.diastolic_pressureData, label: 'Tomas de diastólica' },
  { data: this.heart_rateData, label: 'Tomas de Ritmo Cardiaco' }
 // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];


  constructor(private router: Router, private glucosService: GlucosaService, private presionService: PressureService) {
  }

  public barChartLabels!: Label[];

  public barChartLabels2!: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  ngOnInit(): void {




    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{
      this.nombreUsuario = this.usuario.name;
      this.iduser = this.usuario.id;

      if(this.usuario.user_type == 2){
        this.router.navigate(['doctor/home'])
      }else {
      this.router.navigate(['home']);

    }

  }


    this.presionService.ObtenerPressure().subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
        this.presion = response;

        for(let i = 0;i< this.presion.length;i++){

         if (this.presion[i].user_id.id == this.iduser){

          this.FechaPresion = this.presion[i].date;
          this.Vsystolic_pressure = this.presion[i].systolic_pressure;
          this.Vdiastolic_pressure = this.presion[i].diastolic_pressure;
          this.Vheart_rate = this.presion[i].heart_rate;
          this.fechP.push(this.presion[i].date);
          this.systolic_pressureData.push(this.presion[i].systolic_pressure);
          this.diastolic_pressureData.push(this.presion[i].diastolic_pressure);
          this.heart_rateData.push(this.presion[i].heart_rate);
          }
        }
        for(let i = this.presion.length;i<0;i--){

          if (this.presion[i-1].user_id.id == this.iduser){

           this.FechaPresion = this.presion[i-1].date;
           this.Vsystolic_pressure = this.presion[i-1].systolic_pressure;
           this.Vdiastolic_pressure = this.presion[i-1].diastolic_pressure;
           this.Vheart_rate = this.presion[i-1].heart_rate;
           this.fechP.push(this.presion[i-1].date);
           this.systolic_pressureData.push(this.presion[i-1].systolic_pressure);
           this.diastolic_pressureData.push(this.presion[i-1].diastolic_pressure);
           this.heart_rateData.push(this.presion[i-1].heart_rate);
           }
         }
        this.barChartLabels2 = this.fechP;
        this.router.navigate(['home']);
        return;
      }
    });

    //PRESION

    this.glucosService.getGlucosa().subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
         this.glucosa = response;
          let itera = 10;
          for(let i = 0;i<this.glucosa.length;i++){
            if (this.glucosa[i].user_id.id == this.iduser){
              this.valorGlucosa = this.glucosa[i].measure;
              this.Medidaglucosa = this.glucosa[i].units.description;
              this.FechaGlucosa = this.glucosa[i].date;
           }
          }

        for(let i = this.glucosa.length;i>0;i--){
         if (this.glucosa[i-1].user_id.id == this.iduser){
          if(itera>0){
          this.fech.push(this.glucosa[i-1].date);
          this.GlucosaData.push(this.glucosa[i-1].measure);
         }
          itera --;
          }
        }
        this.barChartLabels = this.fech;
        this.router.navigate(['home']);
        return;
      }
    });
  }

}
