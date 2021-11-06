import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { DoctorInterface } from 'src/app/patient/dao/doctor';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import { RecordInterface } from '../../dao/record';
import { RecordService } from '../../services/record.service.service';
import { ClinicService } from '../../services/clinic.service';
import { ClinicInterface } from '../../dao/clinic';
import { HorarioDoctorService } from 'src/app/doctor/services/horario-doctor.service';
import { HorarioInterface } from '../../dao/horario';
import { CitaService } from '../../services/cita.service';
import { CitaInterface } from '../../dao/cita';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  //SELECTS
  //departamento
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};

  //Clinica
  dropdownListClinic: any = [];
  seleccionoDep: boolean = false;

  //Doctor
  dropdownListDoc:any = [];
  selectedItemsDoc:any = [];
  dropdownSettingsDoc:any = {};
  seleccionoClin: boolean = false;

  //Horario
  dropdownListHor:any = [];
  listaHorarios: any = [];
  seleccionoHorario: boolean = false;
  seleccionoFecha: boolean = false;

  idDoctor: number = 0;
  idClinica: number = 0;
  idDepartamento: number = 0;
  idHorario: any;
  horaInicialCita: any;
  horaFinalCita:any;


  selecDoctor: boolean = false;
  doctor: DoctorInterface[] = [];
  clinica: ClinicInterface[] = [];
  horario: HorarioInterface[] = [];
  cita: CitaInterface = new CitaInterface();


  intervalo: any;
  fechaActual = new Date();
  fechaPicker = '';
  constructor(private router: Router, private formBuilder: FormBuilder,
    private el: ElementRef, private toastr: ToastrService, private recordService: RecordService,
    public datepipe: DatePipe, private doctorService: DoctorService, private clinicaService: ClinicService,
    private horarioDoctor: HorarioDoctorService, private citaService: CitaService) { }

    recordPacForm = new FormGroup({
      fNacimiento: new FormControl(''),
      fName: new FormControl(''),
      direccion: new FormControl(''),
      numId: new FormControl(''),
      peso: new FormControl(''),
      altura: new FormControl(''),
      genero: new FormControl(''),
      telefono: new FormControl(''),
      fechaCita: new FormControl(''),
      justificacion: new FormControl('')
    });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";
  record: RecordInterface = new RecordInterface();

  ngOnInit(): void {

    this.fechaPicker = this.fechaActual.getFullYear() + '-' +
    ("0" + (this.fechaActual.getMonth() + 1)).slice(-2) + '-' +
    ("0" + this.fechaActual.getDate()).slice(-2);


    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }else{
      if(this.usuario.user_type != 1){
        this.router.navigate(['home']);
        return;
      }
    }

    this.nombreUsuario = this.usuario.name;
    this.recordService.expedienteByEmail(this.usuario.email).subscribe((response)=>{
      if(response.status !== 404){


        this.record = response;
        //console.log(this.record.user_id.email);

        let fechaNaci = this.record.date_birth


        const fechaFormateada = this.datepipe.transform(fechaNaci, 'yyyy-MM-dd');

        this.recordPacForm.patchValue({
          fName: this.record.user_id.name,
          fNacimiento: fechaFormateada,
          direccion: this.record.address,
          numId: this.record.num_id,
          telefono:this.record.phone,
          peso: this.record.weight,
          altura: this.record.height,
          genero: this.record.gender,
        });
      }
    });

    this.dropdownList = [
      { item_id: 1, item_text: 'Ahuchapan' },
      { item_id: 2, item_text: 'Cabañas' },
      { item_id: 3, item_text: 'Chalatenango' },
      { item_id: 4, item_text: 'Cuscatlán' },
      { item_id: 5, item_text: 'La Libertad' },
      { item_id: 6, item_text: 'Morazán' },
      { item_id: 7, item_text: 'La Paz' },
      { item_id: 8, item_text: 'Santa Ana' },
      { item_id: 9, item_text: 'San Miguel' },
      { item_id: 10, item_text: 'San Salvador' },
      { item_id: 11, item_text: 'San Vicente' },
      { item_id: 12, item_text: 'Sonsonate' },
      { item_id: 13, item_text: 'La Unión' },
      { item_id: 14, item_text: 'Usulután' },
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      noDataAvailablePlaceholderText: 'No se encontraron datos',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    this.seleccionoDep = true;
    this.idDepartamento=item.item_id;
    //console.log(item);
    this.cargarClinicas(item.item_id)
  }

  onItemSelectClinica(item: any) {
    this.seleccionoClin = true;
    this.idClinica = item.item_id;
    //console.log(item.item_id);
    this.cargarDoctores(item.item_id);
  }
  onItemSelectDoctor(item: any){
    this.seleccionoClin = true;
    //console.log(item.item_id);
    this.selecDoctor = true;
    this.idDoctor = item.item_id;
    this.seleccionoFecha = true;
    let fecha = (<HTMLInputElement>document.getElementById('fechaCita'))
    fecha.value = '';
  }

  onSelectAll(items: any) {
    //console.log(items);
  }
  onDeSelect(item: any){
    this.seleccionoDep = false;
    this.idDepartamento=0;
    //console.log(this.selectedItems);
  }
  onDeSelectClinica(item: any){
    this.seleccionoClin = false;
    //console.log(item);
  }
  onDeSelectDoctor(item: any){
    this.selecDoctor = false;
    this.seleccionoFecha = false;
    //console.log(item);
    this.idDoctor = 0;
    let fecha = (<HTMLInputElement>document.getElementById('fechaCita'))
    fecha.value = '';
  }
  onDeSelectHorario(item: any){
    console.log(item);
  }
  onItemSelectHorario(item: any){

    //console.log(item.item_id);

  }
  get f(){ return this.recordPacForm.controls }

  obtieneHorarios(){
    if(this.selecDoctor && this.seleccionoClin){
      this.listaHorarios = [];
      this.seleccionoFecha = true;
      let fechaCita = this.recordPacForm.value.fechaCita
      this.horarioDoctor.horarioDispByFechaDoc(this.idDoctor, fechaCita).subscribe(async (response)=>{
        if (response.status !== 404){
          this.horario = response;
          this.dropdownListHor = [];
          let dataSel = {};
          let rangoCita = 0;
          let intervalos = [];
          let en = 0;
          let rangoInicial = '';
          let rangoFinal = '';

          this.intervalo = setInterval(() => {
            if(this.listaHorarios.length == 0 && en == 0){
              Swal.fire({
                text: 'Buscando horarios disponibles...'
              })
              Swal.showLoading();
              en++;
            }else if(this.listaHorarios.length > 0){
              Swal.close();
              clearInterval(this.intervalo);
            }
            console.log("entra")
          }, 10);

          for (let i = 0; i < this.horario.length; i++) {
            let horaInicio = this.horario[i].start_time;
            let horaFin = this.horario[i].finish_time;
            rangoCita = this.horario[i].rango_cita;

            intervalos = this.sacaIntervalos(horaInicio, horaFin, rangoCita);

            for (let j = 0; j < intervalos.length - 1; j++) {

              let res = await this.citaService.horarioDispByFechaDoc(this.idDoctor, fechaCita,
                intervalos[j], intervalos[j+1])
              .toPromise();

              if (res.status === 404){
                this.cita = res;
                rangoInicial = intervalos[j].substring(0,5)
                rangoFinal = intervalos[j+1].substring(0,5);

                dataSel = {
                  item_id:  j +'-'+this.horario[i].id,
                  item_text: rangoInicial + ' - ' + rangoFinal,
                };
                this.dropdownListHor.push(dataSel);
              }
            }
          }
          this.listaHorarios = this.dropdownListHor;
        }else{
          this.toastr.error('No se encontraron horarios', 'Error');
        }
      });

    }else{
      this.toastr.error('Favor seleccionar doctor y clínica', 'Error');
    }
  }

  agendarCita(){
    let fechaCita = this.recordPacForm.value.fechaCita;
    let errores = true;
    let justif = this.recordPacForm.value.justificacion;

    if(this.idDepartamento == 0){
      this.toastr.error('Seleccione un departamento', 'Error');
    }else if(this.idClinica == 0){
      this.toastr.error('Seleccione una clínica', 'Error');
    }else if(this.idDoctor == 0){
      this.toastr.error('Seleccione un doctor', 'Error');
    }else if(fechaCita == ''){
      this.toastr.error('Ingrese la fecha de la cita', 'Error');
    } else if(this.idHorario == ''){
      this.toastr.error('Ingrese un horario', 'Error');
    }else if(justif == ''){
      this.toastr.error('Ingrese una justificación', 'Error');
    }else{
      errores = false
    }

    if(errores)
      return;


  }

  cargarDoctores(idClinica: number){
    this.doctor = [];
    this.dropdownListDoc = [];
    this.doctorService.doctorByClinica(idClinica).subscribe((response)=>{
      if (response.status !== 404){
        this.doctor = response;
        this.llenarSelectDoctor(this.doctor);
      }else{
        this.toastr.error('No se encontraron doctores para la clínica', 'Error');
      }
    });
  }

  llenarSelectDoctor(doctores: DoctorInterface[]){
    this.dropdownListDoc = [];
    let dataSel = {};

    for (let i = 0; i < doctores.length; i++) {
      dataSel = {
        item_id: doctores[i].id,
        item_text: 'Dr. ' + doctores[i].user_id.name,
      };
      this.dropdownListDoc.push(dataSel);
    }
  }
  cargarClinicas(idDepa:number){
    this.clinica = [];
    this.dropdownListClinic = [];
    this.clinicaService.clinicaByDepa(idDepa).subscribe((response)=>{
      if (response.status !== 404){
        this.clinica = response;
        this.llenarSelectClinica(this.clinica);
      }else{
        this.toastr.error('No se encontraron clínicas para el departamento', 'Error');
      }
    });

  }
  llenarSelectClinica(clinica: ClinicInterface[]){
    this.dropdownListClinic = [];
    let dataSel = {};

    for (let i = 0; i < clinica.length; i++) {
      dataSel = {
        item_id: clinica[i].id,
        item_text: clinica[i].description,
      };
      this.dropdownListClinic.push(dataSel);
    }
  }
  sacaIntervalos(horaIni:any, horaFin:any, intervalo:number) {
    let a = [];
    let startValue = horaIni;
    let endValue = horaFin;
    let intervalValue = intervalo;
    let startDate = new Date("1/1/2015 " + startValue);
    let endDate = new Date("1/1/2015 " + endValue);
    let offset = intervalValue * 1000 * 60;
    let valor = '';
    let cont = 0;

    do {
      startDate = new Date(startDate.getTime() + offset);
      if (startDate <= endDate){
        if(cont == 0)
          a.push(horaIni);

        valor = ("0" + (startDate.getHours())).slice(-2) + ':' +
         ("0" + (startDate.getMinutes())).slice(-2) + ":" +
         ("0" + (startDate.getSeconds())).slice(-2);
        a.push(valor)
      }
      cont++;
    } while(startDate < endDate);

    return a;
  }
}
