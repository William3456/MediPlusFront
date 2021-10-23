import {Component, OnInit} from '@angular/core';
import {Usuario} from "../auth/dao/usuario";
import {Router} from "@angular/router";
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { GlucosaService } from '../patient/services/glucosa.service';
import { Glucosa, UserID } from '../patient/dao/glucosa';
import { BarChartModule } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();

  glucosa: any;

  valorGlucosa: string = "";
  Medidaglucosa: string = "";
  FechaGlucosa: string = "";


  iduser: any;

  fech: string[] = [];



  Label: any;

  GlucosaData:  any[] = [];

 fechas: string[]= [];

  public barChartOptions: ChartOptions = {
    responsive: true,


  };


public barChartData: ChartDataSets[] = [
  { data: this.GlucosaData, label: 'Tomas de Glucosa' },

 // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];


  constructor(private router: Router, private glucosService: GlucosaService) {
  }

  public barChartLabels!: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  ngOnInit(): void {




    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['home']);
      this.nombreUsuario = this.usuario.name;
      this.iduser = this.usuario.id;
    }

    this.glucosService.getGlucosa().subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
        this.glucosa = response;

        for(let i = 0;i< this.glucosa.length;i++){

         if (this.glucosa[i].user_id.id == this.iduser){

          this.valorGlucosa = this.glucosa[i].measure;
          this.Medidaglucosa = this.glucosa[i].units.description;
          this.FechaGlucosa = this.glucosa[i].date;
         // console.log(this.glucosa[i])
          this.fech.push(this.glucosa[i].date);
          this.GlucosaData.push(this.valorGlucosa = this.glucosa[i].measure);
         // console.log(fech[i]);
          }
        }
        console.log(this.GlucosaData);
        this.barChartLabels = this.fech;

      //  this.Data = this.GlucosaData;
//consolog(this.fech)
        this.router.navigate(['home']);
        return;
      }
    });

  }

}
