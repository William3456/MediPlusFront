import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { CitaService } from 'src/app/patient/services/cita.service';
import { RecordsDetailService } from '../../services/records-detail.service';
import {Location} from '@angular/common';
import { RecordService } from 'src/app/patient/services/record.service.service';
import { RecordInterface } from 'src/app/patient/dao/record';

import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {

  idPaciente: number = 0;
  usuario: Usuario = new Usuario();
  citasPacienteCompletadas: any[] = [];
  observacionesCitas: any[] = [];
  observacionesDetalle: any[] = [];
  observacionesGen: any[] = [];
  datosPacienteGen: any = {}
  hayHistorial: Boolean = false;
  record: RecordInterface = new RecordInterface();

  constructor(private route: ActivatedRoute, public modalServ: NgbModal,
    private formBuilder: FormBuilder, private el: ElementRef,private toastr: ToastrService, private router: Router,
    private citaService: CitaService, private recordDetailsService: RecordsDetailService,
    private _location: Location, private recordService: RecordService) { }

  async ngOnInit(): Promise<void> {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('id'));
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
      return;
    }

    if(this.usuario.user_type == 1){
      this.idPaciente = this.usuario.id;
      if(this.idPaciente != this.usuario.id){
        this.toastr.error('Error al obtener historial', 'Error');
        this._location.back();
        return;
      }
    }

    let observacionesPorPaciente = await this.recordDetailsService.obtenerDetailByPac(this.idPaciente).toPromise();

    if(observacionesPorPaciente[0] == null){
      this.toastr.info('No se encontró historial médico', 'Error');
      if(this.usuario.user_type == 1 && observacionesPorPaciente.length == 0){
        let expediente =await this.recordService.expedienteByEmail(this.usuario.email).toPromise();

        if(expediente.status !== 404){
          this.record = expediente;
          let edad = this.calculaEdad(this.record.date_birth);
          this.datosPacienteGen = {
            nombre:  this.usuario.name,
            direccion: this.record.address,
            credencialId: this.record.identification_id.description,
            credencialNum: this.record.num_id,
            telefono: this.record.phone,
            edad: edad,
            peso: this.record.weight,
            altura: this.record.height,
            profesion: this.record.profession,
          }
          this.hayHistorial == false;
        }else{
          this._location.back();
        }
      }else{
        this._location.back();
      }
      return;
    }
    this.hayHistorial = true;
    let objObsCitas  = {};
    let arrTwo: any[] = [];

    this.observacionesGen = observacionesPorPaciente;


    for(let i= 0; i < observacionesPorPaciente.length; i++){

      arrTwo.push(observacionesPorPaciente[i].detailType_id.description);

      objObsCitas = {
        [String(observacionesPorPaciente[i].detailType_id.description)] : observacionesPorPaciente[i].description
      }
      this.observacionesDetalle.push(objObsCitas);
    }

    this.observacionesCitas = arrTwo.filter(function(ele , pos){
      return  arrTwo.indexOf(ele) == pos;
    });

    let edad = this.calculaEdad(this.observacionesGen[0].record.date_birth);
    if(this.hayHistorial){
      this.datosPacienteGen = {
        nombre:  this.observacionesGen[0].appointment_id.patient_id.name,
        direccion: this.observacionesGen[0].record.address,
        credencialId: this.observacionesGen[0].record.identification_id.description,
        credencialNum: this.observacionesGen[0].record.num_id,
        telefono: this.observacionesGen[0].record.phone,
        edad: edad,
        peso: this.observacionesGen[0].record.weight,
        altura: this.observacionesGen[0].record.height,
        profesion: this.observacionesGen[0].record.profession,
      }
    }


  }

  calculaEdad(edad:any){
    let date = new Date();
    let fnaci = edad;
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

    return ageyear;
  }

  ExportReport(){
    const options ={
      filename: 'DetalleExpediente.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    };


    var element = document.getElementById('element_to_export');
    html2pdf()
    .from(element)
    .set(options)
    .save();

  }

}

