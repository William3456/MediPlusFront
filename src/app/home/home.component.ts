import {Component, OnInit} from '@angular/core';
import {Usuario} from "../auth/dao/usuario";
import {Router} from "@angular/router";
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartDataSets } from 'chart.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.

  };




  public barChartLabels: Label[] = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
//  public barChartPlugins = [pluginDataLabels];

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public randomize(): void {
  // Only Change 3 values
  this.barChartData[0].data = [
    Math.round(Math.random() * 100),
    59,
    80,
    (Math.random() * 100),
    56,
    (Math.random() * 100),
    40 ];
}





public barChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Tomas de Glucosa' },
 // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];

//

public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value: any, ctx: any) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
public pieChartData: number[] = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
//public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];

  constructor(private router: Router) {
  }

  ngOnInit(): void {

    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['home']);
      this.nombreUsuario = this.usuario.name;
    }






  }
}
