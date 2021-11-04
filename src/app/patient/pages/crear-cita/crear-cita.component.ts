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
  seleccionoHorario: boolean = false;
  seleccionoFecha: boolean = false;

  idDoctor: number = 0;
  selecDoctor: boolean = false;
  doctor: DoctorInterface[] = [];
  clinica: ClinicInterface[] = [];
  horario: HorarioInterface[] = [];

  fechaActual = new Date();
  fechaPicker = '';
  constructor(private router: Router, private formBuilder: FormBuilder,
    private el: ElementRef, private toastr: ToastrService, private recordService: RecordService,
    public datepipe: DatePipe, private doctorService: DoctorService, private clinicaService: ClinicService,
    private horarioDoctor: HorarioDoctorService) { }

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
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    this.seleccionoDep = true;
    //console.log(item);
    this.cargarClinicas(item.item_id)
  }

  onItemSelectClinica(item: any) {
    this.seleccionoClin = true;
    //console.log(item.item_id);
    this.cargarDoctores(item.item_id);
  }
  onItemSelectDoctor(item: any){
    this.seleccionoClin = true;
    //console.log(item.item_id);
    this.selecDoctor = true;
    this.idDoctor = item.item_id;
  }

  onSelectAll(items: any) {
    //console.log(items);
  }
  onDeSelect(item: any){
    this.seleccionoDep = false;
    //console.log(this.selectedItems);
  }
  onDeSelectClinica(item: any){
    this.seleccionoClin = false;
    //console.log(item);
  }
  onDeSelectDoctor(item: any){
    this.selecDoctor = false;
    //console.log(item);
    this.idDoctor = 0;
  }
  get f(){ return this.recordPacForm.controls }

  obtieneHorarios(){
    if(this.selecDoctor && this.seleccionoClin){
      let fech = document.getElementById('fechaCita');

      this.seleccionoFecha = true;
      let fechaCita = this.recordPacForm.value.fechaCita
      this.horarioDoctor.horarioDispByFechaDoc(this.idDoctor, fechaCita).subscribe((response)=>{
        if (response.status !== 404){
          this.horario = response;
          this.dropdownListHor = [];
          let dataSel = {};
          let rangoCita = 0;
          var horaIni = 0;
          let horasRango = 0;


          for (let i = 0; i < this.horario.length; i++) {


            var horaInicio = this.horario[i].start_time;
            var horaFin = this.horario[i].finish_time;
            var horasTot = 0;

            rangoCita = this.horario[i].rango_cita;
            horaIni = parseInt(horaInicio.split(':')[0]);
            horasRango =  rangoCita / 60;

            horasTot = parseInt(horaFin) - parseInt(horaInicio)  ;

            if(rangoCita == 30){
              horasTot *= 2;
            }

            for (let j = 0; j < horasTot; j++) {
              var rangoInicial = horaIni;
              var rango1 = horaIni + horasRango;
              horaIni = rango1;

              var rangoIni = rangoInicial+'';
              var rangoFin = horaIni+'';

              if(horasRango != 1){
                if(j % 2 == 0){
                  rangoIni = rangoIni.split('.')[0]+':00';
                  rangoFin = rangoFin.split('.')[0]+':30';
                }else{
                  rangoIni = rangoIni.split('.')[0]+':30';
                  rangoFin = rangoFin.split('.')[0]+':00';
                }
              }else{
                rangoIni = rangoIni.split('.')[0]+':00';
                rangoFin = rangoFin.split('.')[0]+':00';
              }

              dataSel = {
                item_id: this.horario[i].id,
                item_text: rangoIni + ' - ' +rangoFin,
              };
              this.dropdownListHor.push(dataSel);
            }
          }
        }else{
          this.toastr.error('No se encontraron horarios', 'Error');
        }
      })
    }else{
      this.toastr.error('Favor seleccionar doctor y clínica', 'Error');
    }
  }

  llenarSelectHorario(){

  }
  agendarCita(){

  }

  cargarDoctores(idClinica: number){
    this.doctor = [];
    this.dropdownListDoc = [];
    this.doctorService.doctorByClinica(idClinica).subscribe((response)=>{
      if (response.status !== 404){
        this.doctor = response;
        this.llenarSelectDoctor(this.doctor);
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
}
