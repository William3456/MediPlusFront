import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlucosaService } from 'src/app/patient/services/glucosa.service';
import { PressureService } from 'src/app/patient/services/pressure.service';
import { RecordService } from 'src/app/patient/services/record.service.service';
import { DoctorService } from '../../services/doctor.service';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  constructor(private route: ActivatedRoute,private doctorService: DoctorService,private glucosService: GlucosaService, private presionService: PressureService,private formBuilder: FormBuilder,
    private recordService: RecordService, private el: ElementRef, private toastr: ToastrService,
    public datepipe: DatePipe) { }
  idPatient: any;

  //----------

  nombreUsuario: string = "";
 // usuario: Usuario = new Usuario();
  glucosa: any;
  presion: any;
  valorGlucosa: string = "N/A";
  Medidaglucosa: string = "N/A";
  FechaGlucosa: string = "N/A";
  FechaPresion: string = "N/A";
  Vsystolic_pressure: string = "N/A";
  Vdiastolic_pressure: string = "N/A";
  Vheart_rate: string = "N/A";

  user: any;
  iduser: any;
  fech: string[] = [];
  fechP: string[] = [];
  Label: any;
  GlucosaData:  any[] = [];
  systolic_pressureData: any[] = [];
  diastolic_pressureData: any[] = [];
  heart_rateData: any[] =[];

 fechas: string[]= [];


 recordForm = new FormGroup({
  fNacimiento: new FormControl(''),
  fName: new FormControl(''),
  edadActual: new FormControl(''),
  direccion: new FormControl(''),
  tipoId: new FormControl(''),
  numId: new FormControl(''),
  peso: new FormControl(''),
  altura: new FormControl(''),
  genero: new FormControl(''),
  profesion: new FormControl(''),
  terminos: new FormControl(''),
  telefono: new FormControl(''),
});

submitted = false;
date: any;

public barChartOptions: ChartOptions = {
  responsive: true,
};

public barChartGlucoData: ChartDataSets[] = [
  { data: this.GlucosaData, label: 'Tomas de Glucosa' }
 // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }

];

public barChartDataPresion: ChartDataSets[] = [
  { data: this.systolic_pressureData, label: 'Tomas de sistólica' },
  { data: this.diastolic_pressureData, label: 'Tomas de diastólica' },
  { data: this.heart_rateData, label: 'Tomas de Ritmo Cardiaco' }
 // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];

public barChartLabels!: Label[];

  public barChartLabels2!: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  record: any;
 //------

    get f(){ return this.recordForm.controls }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.idPatient = params.get('id');
    })


    this.doctorService.getPatienById(this.idPatient).subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
      this.user = response;

      this.getRecord();

      this.getTomas();

      }
    })




    this.recordForm = this.formBuilder.group({
      direccion: ['', [ Validators.required, Validators.minLength(15) ]],
      fNacimiento: ['', [ Validators.required]],
      tipoId: ['', [ Validators.required]],
      numId: ['', [ Validators.required]],
      peso: ['', [ Validators.required]],
      altura: ['', [ Validators.required]],
      genero: ['', [ Validators.required]],
      profesion: ['', [ Validators.required]],
      telefono: ['', [ Validators.required]],
      fName:  ['', []],
      terminos:  ['', []],
      edadActual:  ['', []],
    });




    //this.router.navigate(['/patient/record/new']);

  }

  getTomas(){
    this.presionService.getPressureById(this.idPatient).subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
        this.presion = response;

        for(let i = 0;i< this.presion.length;i++){

          this.FechaPresion = this.presion[i].date;
          this.Vsystolic_pressure = this.presion[i].systolic_pressure;
          this.Vdiastolic_pressure = this.presion[i].diastolic_pressure;
          this.Vheart_rate = this.presion[i].heart_rate;
          this.fechP.push(this.presion[i].date);
          this.systolic_pressureData.push(this.presion[i].systolic_pressure);
          this.diastolic_pressureData.push(this.presion[i].diastolic_pressure);
          this.heart_rateData.push(this.presion[i].heart_rate);
          }

        for(let i = this.presion.length;i<0;i--){

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
    });

    //PRESION

    this.glucosService.getGlucosaById(this.idPatient).subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
         this.glucosa = response;
          let itera = 10;


          for(let i = 0;i<this.glucosa.length;i++){

              this.valorGlucosa = this.glucosa[i].measure;
              this.Medidaglucosa = this.glucosa[i].units.description;
              this.FechaGlucosa = this.glucosa[i].date;

          }

        for(let i = this.glucosa.length;i>0;i--){

          if(itera>0){
          this.fech.push(this.glucosa[i-1].date);
          this.GlucosaData.push(this.glucosa[i-1].measure);
         }
          itera --;
          }

        }
        this.barChartLabels = this.fech;



    });
  }

getRecord(){
  this.recordService.expedienteByEmail(this.user.email).subscribe((response)=>{
    if(response.status !== 404){

      this.record = response;


      let fechaNaci = this.record.date_birth


      const fechaFormateada = this.datepipe.transform(fechaNaci, 'yyyy-MM-dd');

      this.recordForm.patchValue({
        fName: this.record.user_id.name,
        fNacimiento: fechaFormateada,
        direccion: this.record.address,
        tipoId: this.record.identification_id.description,
        numId: this.record.num_id,
        telefono:this.record.phone,
        peso: this.record.weight,
        altura: this.record.height,
        genero: this.record.gender,
        profesion: this.record.profession,
      });
      this.calculaEdad();
      //this.router.navigate(['patient/verRecord']);
      //return;
    }
  });
}

  calculaEdad(){
    let date = new Date();
    let fnaci = this.recordForm.value.fNacimiento;
    //Nacimiento
    let yearN = fnaci.split("-")[0];
    let mesN = fnaci.split("-")[1];
    let diaN = fnaci.split("-")[2];

    //Fecha actual
    let year = date.getFullYear();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;

    var todayDate=new Date();
    var ageyear = todayDate.getFullYear() - fnaci.split("-")[0];
    var agemonth = todayDate.getMonth() - fnaci.split("-")[1];
    var ageday = todayDate.getDate() - fnaci.split("-")[2];

    if (agemonth <= 0) {
      ageyear--;
      agemonth = (12 + agemonth);
    }
    if (dia < diaN) {
      agemonth--;
      ageday = 30 + ageday;
    }  if (agemonth == 12) {
      ageyear = ageyear + 1;
      agemonth = 0;
    }
    //console.log(ageyear);

    this.recordForm.patchValue({
      edadActual: ageyear,
    });
  }
}
