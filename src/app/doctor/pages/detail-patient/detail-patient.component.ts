import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlucosaService } from 'src/app/patient/services/glucosa.service';
import { PressureService } from 'src/app/patient/services/pressure.service';
import { RecordService } from 'src/app/patient/services/record.service.service';
import { DoctorService } from '../../services/doctor.service';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { detalleExpInterface } from 'src/app/patient/dao/detalleExpediente';
import { Usuario } from 'src/app/auth/dao/usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from 'src/app/patient/services/cita.service';
import { param } from 'jquery';
import { CitaInterface } from 'src/app/patient/dao/cita';
import { Status } from '../../../patient/dao/detalleExpediente';
import { HorarioDoctorService } from '../../services/horario-doctor.service';
import { Description } from '../../dao/CitasDoctor';


@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  constructor(private route: ActivatedRoute,private doctorService: DoctorService,private glucosService: GlucosaService, private presionService: PressureService,private formBuilder: FormBuilder,
    private recordService: RecordService, private el: ElementRef, private toastr: ToastrService,
    public datepipe: DatePipe,
     public modal: NgbModal,
    private router: Router,
    private citaService: CitaService,
    private horarioDoctor: HorarioDoctorService) { }
  idPatient: any;

  //----------

  nombreUsuario: string = "";
 // usuario: Usuario = new Usuario();

 appointment: any;
  glucosa: any;
  presion: any;
  valorGlucosa: string = "N/A";
  Medidaglucosa: string = "N/A";
  FechaGlucosa: string = "N/A";
  FechaPresion: string = "N/A";
  Vsystolic_pressure: string = "N/A";
  Vdiastolic_pressure: string = "N/A";
  Vheart_rate: string = "N/A";

  valor = '';
  detalle: Array<string> = [];
  detalleid: Array<string> = [];
  justifi: Array<string>=[];
  user: any;
  iduser: any;
  fech: string[] = [];
  fechP: string[] = [];
  Label: any;
  GlucosaData:  any[] = [];
  systolic_pressureData: any[] = [];
  diastolic_pressureData: any[] = [];
  heart_rateData: any[] =[];
  conta = 0;
 fechas: string[]= [];
descricionOK = false;
 idCita: any;
 usuario: Usuario = new Usuario();
 detalleCita: any = {};
 detallesDoctor: detalleExpInterface[] = [];

 detallesCita: CitaInterface[] = [];

 detalleApoitment: any;
 detalles: any[] = [];

 operacion: any;
 selectOpera = false;

 dropdownListDetail: any;
 dropdownListOpera: any;
 dropdownSettingsOperacion = {};

 dropdownSettingsDetail = {};

 recordDetailData: any;



 agregarDetalleForm = new FormGroup({
  description0 : new FormControl(''),
});



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



  ngOnInit(): void {

    this.dropdownListOpera = [
      { item_id: 5, item_text: 'Realizada' },
      { item_id: 3, item_text: 'Cancelar' },
      { item_id: 4, item_text: 'Vencida' },

    ];



    this.route.paramMap.subscribe((params: ParamMap)=>{

      this.idCita = params.get('id');
    })


    this.dropdownSettingsDetail = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: false
    };
    this.dropdownSettingsOperacion = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };


  this.citaService.obtenerCitasPorId(this.idCita).subscribe((response: any)=>{
    if(response.status !== 404){
      let arrTwo: any[] =[]
      this.detalleApoitment = response;
      console.log(response[0])
     this.idPatient = this.detalleApoitment.patient_id.id;
      console.log(this.idPatient)

      this.detalleCita = {

        paciente : this.detalleApoitment.patient_id.name,
        doctor: this.detalleApoitment.doctor_id.user_id.name,
        estado: this.detalleApoitment.status.description,
        estadoId: this.detalleApoitment.status.id,
        fecha: this.detalleApoitment.appointment_date,
        horaIni: this.detalleApoitment.appointment_time,
        horaFin: this.detalleApoitment.appointment_time_finish,
        justificacion: this.detalleApoitment.justification,
        departamento: this.detalleApoitment.doctor_id?.clinic_id?.department_id?.description,
        clinica: this.detalleApoitment.doctor_id?.clinic_id?.description,
        doctorEspec: this.detalleApoitment.doctor_id?.speciality,
        doctorEmail: this.detalleApoitment.doctor_id?.user_id?.email,
        doctorNumReg: this.detalleApoitment.doctor_id?.num_reg_doc,
      }

      this.agregarDetalleForm = this.formBuilder.group({
        justificacion : ['', [ Validators.required, Validators.minLength(10)]],
      });

      this.getDatos();

    }
  })



  this.doctorService.getRecordDetail().subscribe((response: any)=>{
    if(response.Status !== 404){

      this.recordDetailData = response;

      this.dropdownListDetail = [];
      let dataSel = {};

      for(let i = 0;i<this.recordDetailData.length;i++){
        dataSel =
{ item_id: this.recordDetailData[i].id, item_text: this.recordDetailData[i].description};
this.dropdownListDetail.push(dataSel);

    }
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
  onItemSelectDetail(item: any) {

    this.detalle.push(item);
    this.detalleid.push(item.item_id);
    this.agregar(this.detalle);
   // this.selectDay = true;


   }

   onItemSelectOpera(item:any){
    this.operacion = item.item_id;
    this.selectOpera = true;

   }

   agregar(deta: any) {

    var nFilas = $("#tabla tr").length;
    if (nFilas == 0) {
        nFilas = 1;
    }
    let cont = nFilas;
    var fila = '<tr  id="fila' + cont + '">' +
        '<th scope="row">' + cont + '</th>' +
        '<td>'+deta[this.conta].item_text +'</td>' +
        '<td><textarea style="height: 75px" id="descripcion'+this.conta+'" class="form-control-lg" required  [ngClass]="{f.justificacion.errors}" ></textarea></td>' +
        '<td><button type="button"  class="btn btn-danger" id="elim' + this.conta + '" onclick="eliminarFila(this)">Eliminar</button></td>' +
        '</tr>';
    $('#tabla').append(fila);
    cont++;
    this.conta++;
}

 getDatos(){
    this.doctorService.getPatienById(this.idPatient).subscribe((response: any)=>{
      if(response.status !== 404){
        //console.log(this.usuario.id);
      this.user = response;

      this.getRecord();

      this.getTomas();

      }
    })
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
  get f(){ return this.agregarDetalleForm.controls }
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
    }
  });
}

agregarDetalle(){
  if(this.selectOpera==true){
  this.formu();
  this.crearDetalle();

  this.horarioDoctor.updateStatusCita(this.idCita,this.operacion).subscribe((response)=>{
if(response.Status !== 404){
  this.appointment = response
  if(response.status === 200){

    this.toastr.success('Datos acualizados correctamente', 'Operación exitosa');


  }else{
    this.toastr.error('Error', 'Error al guardar los datos');
  }
}

  })
}
}

crearDetalle(){

  if(this.descricionOK==true){

  let insert = false;
  for(let i =0; i<this.detalle.length;i++){

  const detalleData = {
      description: this.justifi[i],
      detailType_id: {
        id:  parseInt(this.detalleid[i])
      },
      appointment_id: {
        id: parseInt(this.idCita)
      },
      status: {
        id: 1
      }
  }
  console.log(detalleData)
  this.horarioDoctor.crearDetalle(detalleData).subscribe((response)=>{
    if(insert== false){
      insert = true;
   //   this.toastr.success('Datos guardados correctamente', 'Operación exitosa');
    }
  })
}
  }
}

formu(){
  this.justifi =[];
  this.descricionOK = true;
let val
  for(let i =0; i<this.conta;i++){
    val = (<HTMLInputElement>document.getElementById('descripcion'+i+'')).value;//((document.getElementById("descripcion0") as HTMLInputElement).value);//document.getElementById("description0").value;

  //this.justifi[i] = this.agregarDetalleForm.value.description0;
  if(val == ""){
    this.toastr.error('Error', 'Debe agregar una descripcion');
    this.descricionOK = false;
  }else{
  this.justifi[i] =  val;
  }
}
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
