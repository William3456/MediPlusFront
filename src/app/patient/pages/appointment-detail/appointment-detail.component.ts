import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { detalleExpInterface } from '../../dao/detalleExpediente';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  idCita: number = 0;
  submitted = false;
  usuario: Usuario = new Usuario();
  detalleCita: any = {};
  detallesDoctor: detalleExpInterface[] = [];
  detalles: any[] = [];
  hayComentarios: boolean= false;
  arrDetallDesc: any[] = [];

  canCitaForm = new FormGroup({
    justificacion : new FormControl(''),
  });

  constructor(private route: ActivatedRoute, public modal: NgbModal,
    private formBuilder: FormBuilder, private el: ElementRef,private toastr: ToastrService, private router: Router,
    private citaService: CitaService) { }

  async ngOnInit(): Promise<void> {
    this.idCita = Number(this.route.snapshot.paramMap.get('id'));
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario'));
    if (localStorage.getItem('usuario') == undefined) {
      this.router.navigate(['login']);
    }else{
      this.canCitaForm = this.formBuilder.group({
        justificacion : ['', [ Validators.required, Validators.minLength(10)]],
      });

      let citaDetail = await this.citaService.obtenerDetalleCita(this.idCita).toPromise();

      if(citaDetail.status !== 404){
        let arrTwo: any[] =[];
        this.arrDetallDesc = [];
        let obDetallDesc: {} = {};
        let idDetalleTipo: any;

        if(citaDetail.id === null){
          this.hayComentarios = false;
          this.detalleCita = {
            paciente : citaDetail.appointment_id.patient_id?.name,
            doctor: citaDetail.appointment_id.doctor_id?.user_id?.name,
            estado: citaDetail.appointment_id.status?.description,
            estadoId: citaDetail.appointment_id.status?.id,
            fecha: citaDetail.appointment_id.appointment_date,
            horaIni: citaDetail.appointment_id.appointment_time,
            horaFin: citaDetail.appointment_id.appointment_time_finish,
            justificacion: citaDetail.appointment_id.justification,
            departamento: citaDetail.appointment_id.doctor_id?.clinic_id?.department_id?.description,
            clinica: citaDetail.appointment_id.doctor_id?.clinic_id?.description,
            doctorEspec: citaDetail.appointment_id.doctor_id?.speciality,
            doctorEmail: citaDetail.appointment_id.doctor_id?.user_id?.email,
            doctorNumReg: citaDetail.appointment_id.doctor_id?.num_reg_doc,
          }
          console.log(citaDetail.id);
          return;
        }
        this.hayComentarios = true;
        this.detallesDoctor = citaDetail;

        this.detalleCita = {
          paciente : this.detallesDoctor[0].appointment_id.patient_id?.name,
          doctor: this.detallesDoctor[0].appointment_id.doctor_id?.user_id?.name,
          estado: this.detallesDoctor[0].appointment_id.status?.description,
          estadoId: this.detallesDoctor[0].appointment_id.status?.id,
          fecha: this.detallesDoctor[0].appointment_id.appointment_date,
          horaIni: this.detallesDoctor[0].appointment_id.appointment_time,
          horaFin: this.detallesDoctor[0].appointment_id.appointment_time_finish,
          justificacion: this.detallesDoctor[0].appointment_id.justification,
          departamento: this.detallesDoctor[0].appointment_id.doctor_id?.clinic_id?.department_id?.description,
          clinica: this.detallesDoctor[0].appointment_id.doctor_id?.clinic_id?.description,
          doctorEspec: this.detallesDoctor[0].appointment_id.doctor_id?.speciality,
          doctorEmail: this.detallesDoctor[0].appointment_id.doctor_id?.user_id?.email,
          doctorNumReg: this.detallesDoctor[0].appointment_id.doctor_id?.num_reg_doc,
        }

        for (let i = 0; i < this.detallesDoctor.length; i++) {
          arrTwo.push(this.detallesDoctor[i].detailType_id?.description);

          obDetallDesc = {
            [String(this.detallesDoctor[i].detailType_id?.description)] : this.detallesDoctor[i].description
          }
          this.arrDetallDesc.push(obDetallDesc);
        }

        //Eliminar duplicados
        this.detalles = arrTwo.filter(function(ele , pos){
          return  arrTwo.indexOf(ele) == pos;
        });
      }else{
        this.toastr.error('No se encontró la cita', 'Error');
        this.router.navigate(['/patient/appointment/my_appointments']);
      }
    }
  }
  cambiarEstado(){
    this.submitted = true;
    if(this.canCitaForm.invalid){
      return
    }
  }
  get f(){ return this.canCitaForm.controls }
}
