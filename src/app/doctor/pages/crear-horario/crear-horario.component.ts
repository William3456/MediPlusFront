import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { DoctorService } from '../../services/doctor.service';
import { diaInterface, DoctorInterface } from '../../dao/Doctor';
import { HorarioDoctorService } from '../../services/horario-doctor.service';
import { Status } from '../../dao/CitasDoctor';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent implements OnInit {

  submitted = false;
  clinica: string = "";
  nombreUsuario: string = "";
  usuario: Usuario = new Usuario();
  horario = false;
  appoitment: any;

  horarioDoc: any;

  clinicDiasData: any;

doctorData: any;

selectDay: boolean = false;
selectHoraIni: boolean = false;
selectHoraFin: boolean = false;
selectRango: boolean = false;

valorHIni = 0;

valorHFin = 0;

  clinicScheduleData: any;

  dropdownListDia: any;
  dropdownListHora: any;
  selectedItems: any;
  dropdownListRango: any;
  dropdownSettings = {};
  dia: Array<string> = [];
  dias: any;
  horaInicio: any = 0;
  horaFin: any=0;
  iteradia = 0;
  valRango: any=0;
  dropdownSettingsHora = {};
  dropdownSettingsHoraFin = {};
  dropdownSettingsRango = {};

  dochorarioForm = new FormGroup({})
  opera = false;


  constructor(private router: Router, private formBuilder: FormBuilder,
    private el: ElementRef, private toastr: ToastrService, private doctorservice: DoctorService,
    private horarioDocService: HorarioDoctorService) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{



      this.doctorservice.doctoreByEmail(this.usuario.email).subscribe((response)=>{
        if(response.status !== 404){


          this.doctorData = response;
          this.clinica =this.doctorData.clinic_id.description


        }
      });


      this.doctorservice.getAppointment().subscribe((response: any)=>{
        if(response.status !== 404){

          this.appoitment = response;



        }
      });
    }

/*

    this.dropdownListDia = [
      { item_id: 1, item_text: 'Lunes' },
      { item_id: 2, item_text: 'Martes' },
      { item_id: 3, item_text: 'Miercoles' },
      { item_id: 4, item_text: 'Jueves' },
      { item_id: 5, item_text: 'Viernes' }
    ];
*/



    this.dropdownListRango = [
      { item_id: 30, item_text: '30 minutos' },
      { item_id: 60, item_text: '1 hora' },
    ];



    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Eliminar',
      allowSearchFilter: false
    };

    this.dropdownSettingsHora = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Eliminar todos',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };

this.getDays();

  }

  guardarHorarioDoc(){
  this.guardarHorarioDocs(this.dia);
  }



  obtenerHorarios(){
    this.horarioDocService.getHorarioDoctor().subscribe((response: any)=>{
      if(response.status !== 404){

        this.horarioDoc = response;
       for(let i = 0; i<this.horarioDoc.length;i++){
        if(this.horaInicio === this.horarioDoc[i].start_time && this.dia[i] === this.horarioDoc[i].day_id.id){
          this.toastr.error('Error', 'Horario ya existe ');
          this.selectHoraFin = false;
          break;
        }else if(this.horaFin === this.horarioDoc[i].finish_time && this.dia[i] === this.horarioDoc[i].day_id.id){
          this.toastr.error('Error', 'Horario ya existe ');
          this.selectHoraFin = false;
          break;
        }
       }



      }
    });

  }

  agregarDetalle(){



  }

  guardarHorarioDocs(days: any){

    if(this.doctorData.id != null && this.horaInicio != [] && this.dia != [] && this.valRango != 0){
    this.submitted = true;
    const invalidControl = this.el.nativeElement.querySelector('.is-invalid');
    if(this.dochorarioForm.invalid){
      this.toastr.error('Debe completar uno o más campos', 'Error');
      return
    }

    for(let i = 0;i<days.length;i++){

    const horario = {

      doctor_id:{
          id: this.doctorData.id
        },
        start_time: this.horaInicio,
        finish_time: this.horaFin,
        day_id: {
          id: parseInt(this.dia[i])
        },
        rango_cita: this.valRango
      }


    this.horarioDocService.crearHorarioDoctor(horario).subscribe(response => {

      if(response.status === 200){
        if(this.opera==false){
          this.opera = true
        this.toastr.success('Datos guardados correctamente', 'Operación exitosa');
        this.router.navigate(['/home']);
        }

      }else{
        if(this.opera=false){
          this.opera = true
        this.toastr.error('Error', 'Error al guardar los datos');
      }
    }
    })
  }
}else{
  this.toastr.error('Error', 'Completar valores');
}
  }

  getDays(){
    this.horarioDocService.getClinicSchedule().subscribe((response)=>{
      if(response.Status !== 400){

        this.clinicDiasData = response;
        this.dropdownListDia = [];
        let dataSel = {};

        for(let i = 0;i<this.clinicDiasData.length;i++){
          dataSel =
  { item_id: this.clinicDiasData[i].day_id.id, item_text: this.clinicDiasData[i].day_id.description};
  this.dropdownListDia.push(dataSel);
        }


      }})
  }
  getHoras(day: any){
    this.horarioDocService.getClinicSchedule().subscribe((response)=>{
      if(response.Status !== 400){
this.clinicScheduleData = response;

this.dropdownListHora = [];
let dataSel = {};
let rangoCita = 0;
var horaIni = 0;
var horaF = 0;
var ReceIni = 0;
var ReceFin = 0;

let horasRango = 0;
for(let h =0;h<=day.length;h++){

for(let i = 0; i<this.clinicScheduleData.length;i++){

if(day[h] == this.clinicScheduleData[i].day_id.id){
  this.dropdownListHora = [];
var horaInicio = this.clinicScheduleData[i].start_time;
var horaFin = this.clinicScheduleData[i].finish_time;
var RecesoIni = this.clinicScheduleData[i].receso_inicio;
var RecesoFin = this.clinicScheduleData[i].receso_fin;

horaIni = parseInt(horaInicio.split(':')[0]);
horaF = parseInt(horaFin.split(':')[0]);
if(ReceIni!=0 && ReceFin!=0){
ReceIni = parseInt(RecesoIni.split(':')[0]);
ReceFin = parseInt(RecesoFin.split(':')[0]);
}
let itera = 1;
for(let j = horaIni; j<horaF;j++){

  if(j!=ReceIni && j!=ReceFin){
    if(j<10){
      dataSel ={ item_id: itera, item_text: '0'+j+':00:00' };
    }else{
      dataSel ={ item_id: itera, item_text: j+':00:00' };
    }

  this.dropdownListHora.push(dataSel);
itera ++;
  }

}
}
}
}
      }
    })
  }

  onItemSelectDia(item: any) {

   this.dia.push(item.item_id);
    this.getHoras(this.dia);
    this.selectDay = true;


  }
  onSelectAllDia(items: any) {
    this.dias = items
    this.getHorasAll(this.dias);
    this.selectDay = true;
  }

  onDeSelectDia(item: any){
    let arrTwo: any[] = [];

  arrTwo = this.dia;
    this.selectDay = false;
    this.dia = arrTwo.filter(function(n){
     return n !== item.item_id;

    })
    console.log(this.dia);

  }
  onDeSelectHIni(item: any){
    this.selectHoraIni = false;


  }
  onDeSelectHFin(item: any){
    this.selectHoraFin = false;

  }
  onDeSelectRango(item: any){
    this.selectRango = false;

  }
  onItemSelectHora(item: any) {
    this.horaInicio =item.item_text;

    this.selectHoraIni = true;

  }
  onItemSelectHoraFin(item: any) {
   this.horaFin = item.item_text;
   this.obtenerHorarios()

    if(parseInt(this.horaInicio.split(':')[0]) == parseInt(this.horaFin.split(':')[0])){
      this.toastr.error('Error', 'Hora Inicio y Hora Fin son iguales');
      this.selectHoraFin = false;
    }else if(parseInt(this.horaInicio.split(':')[0]) > parseInt(this.horaFin.split(':')[0])){
      this.selectHoraFin = false;
      this.toastr.error('Error', 'Hora Fin es menor ');
    }else{
      this.selectHoraFin = true;
    }


  }
  onItemSelectRango(item: any) {
    this.valRango = item.item_id;
    this.selectRango = true;
   }

   getHorasAll(day: any){

    this.horarioDocService.getClinicSchedule().subscribe((response)=>{
      if(response.Status !== 400){
this.clinicScheduleData = response;

this.dropdownListHora = [];
let dataSel = {};
let rangoCita = 0;
var horaIni = 0;
var horaF = 0;
var ReceIni = 0;
var ReceFin = 0;

let horasRango = 0;
for(let h =0;h<day.length;h++){

for(let i = 0; i<this.clinicScheduleData.length;i++){

if(day[h].item_id == this.clinicScheduleData[i].day_id.id){
  this.dropdownListHora = [];

var horaInicio = this.clinicScheduleData[i].start_time;
var horaFin = this.clinicScheduleData[i].finish_time;
var RecesoIni = this.clinicScheduleData[i].receso_inicio;
var RecesoFin = this.clinicScheduleData[i].receso_fin;

horaIni = parseInt(horaInicio.split(':')[0]);
horaF = parseInt(horaFin.split(':')[0]);
if(ReceIni!=0 && ReceFin!=0){
ReceIni = parseInt(RecesoIni.split(':')[0]);
ReceFin = parseInt(RecesoFin.split(':')[0]);
}
let itera = 1;
for(let j = horaIni; j<horaF;j++){

  if(j!=ReceIni && j!=ReceFin){

dataSel =
  { item_id: itera, item_text: j+':00:00' };
  this.dropdownListHora.push(dataSel);
itera ++;
  }

}
}
}
}
      }
    })
  }


}



