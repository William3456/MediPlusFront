import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { DoctorService } from '../../services/doctor.service';
import { diaInterface, DoctorInterface } from '../../dao/Doctor';
import { HorarioDoctorService } from '../../services/horario-doctor.service';

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

doctorData: any;

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
  dropdownSettingsHora = {};
  dropdownSettingsHoraFin = {};
  dropdownSettingsRango = {};

  dochorarioForm = new FormGroup({})


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
          console.log(this.doctorData);

        }
      });


      this.doctorservice.getAppointment().subscribe((response: any)=>{
        if(response.status !== 404){
          //console.log(this.usuario.id);
          this.appoitment = response;

         console.log(this.appoitment);

        }
      });
    }



    this.dropdownListDia = [
      { item_id: 1, item_text: 'Lunes' },
      { item_id: 2, item_text: 'Martes' },
      { item_id: 3, item_text: 'Miercoles' },
      { item_id: 4, item_text: 'Jueves' },
      { item_id: 5, item_text: 'Viernes' }
    ];

    this.dropdownListHora = [
      { item_id: 1, item_text: '06:00:00' },
      { item_id: 2, item_text: '07:00:00' },
      { item_id: 3, item_text: '08:00:00' },
      { item_id: 4, item_text: '09:00:00' },
      { item_id: 5, item_text: '10:00:00' },
      { item_id: 6, item_text: '11:00:00' },
      { item_id: 7, item_text: '12:00:00' },
      { item_id: 8, item_text: '13:00:00' },
      { item_id: 9, item_text: '14:00:00' },
      { item_id: 10, item_text: '15:00:00' },
      { item_id: 11, item_text: '16:00:00' },
      { item_id: 12, item_text: '17:00:00' },
    ];


    this.dropdownListRango = [
      { item_id: 30, item_text: '30 minutos' },
      { item_id: 60, item_text: '1 hora' },
    ];

    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
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



  }

  guardarHorarioDoc(){
    this.submitted = true;
    const invalidControl = this.el.nativeElement.querySelector('.is-invalid');
    if(this.dochorarioForm.invalid){
      this.toastr.error('Debe completar uno o más campos', 'Error');
      return
    }

    const horario = {

      doctor_id:{
          id: this.doctorData.id
        },
        start_time: this.horaInicio,
        finish_time: this.horaFin,
        day_id: {
          id: parseInt(this.dia[0])
        },
        rango_cita: 60
      }

    console.log(horario);

    this.horarioDocService.crearHorarioDoctor(horario).subscribe(response => {
      console.log(response);
      if(response.status === 200){
        this.toastr.success('Datos guardados correctamente', 'Operación exitosa');
        this.router.navigate(['/home']);
      }else{
        this.toastr.error('Error', 'Error al guardar los datos');
      }
    })

  }


  onItemSelectDia(item: any) {

   this.dia.push(item.item_id);
    console.log(this.dia);


  }
  onSelectAllDia(items: any) {
    this.dias = items;
    console.log(this.dias);
  }

  onItemSelectHora(item: any) {
    this.horaInicio =item.item_text;

  }
  onItemSelectHoraFin(item: any) {
   this.horaFin = item.item_text;

  }


}



