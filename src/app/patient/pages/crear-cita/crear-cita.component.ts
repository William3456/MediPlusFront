import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/auth/dao/usuario';
import { RecordInterface } from '../../dao/record';
import { RecordService } from '../../services/record.service.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  //SELECTS
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  seleccionoDep: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private el: ElementRef, private toastr: ToastrService, private recordService: RecordService,
    public datepipe: DatePipe) { }

    recordPacForm = new FormGroup({
      fNacimiento: new FormControl(''),
      fName: new FormControl(''),
      direccion: new FormControl(''),
      numId: new FormControl(''),
      peso: new FormControl(''),
      altura: new FormControl(''),
      genero: new FormControl(''),
      telefono: new FormControl(''),
    });

  submitted = false;
  usuario: Usuario = new Usuario();
  nombreUsuario: string = "";
  record: RecordInterface = new RecordInterface();

  ngOnInit(): void {
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
        console.log(this.record.user_id.email);

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
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelect(item: any){
    this.seleccionoDep = false;
    console.log(item);
  }
  get f(){ return this.recordPacForm.controls }

  agendarCita(){

  }
}
