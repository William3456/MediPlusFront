import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent implements OnInit {
  dropdownListDia: any;
  dropdownListHoraInicio: any;
  dropdownListHoraFin: any;
  selectedItems: any;
  dropdownSettings = {};

  dropdownSettingsHora = {};
  dropdownSettingsHoraFin = {};


  constructor() { }

  ngOnInit(): void {

    this.dropdownListDia = [
      { item_id: 1, item_text: 'Lunes' },
      { item_id: 2, item_text: 'Martes' },
      { item_id: 3, item_text: 'Miercoles' },
      { item_id: 4, item_text: 'Jueves' },
      { item_id: 5, item_text: 'Viernes' }
    ];

    this.dropdownListHoraInicio = [
      { item_id: 1, item_text: '6:00' },
      { item_id: 2, item_text: '7:00' },
      { item_id: 3, item_text: '8:00' },
      { item_id: 4, item_text: '9:00' },
      { item_id: 5, item_text: '10:00' },
      { item_id: 6, item_text: '11:00' },
      { item_id: 7, item_text: '12:00' },
      { item_id: 8, item_text: '13:00' },
      { item_id: 9, item_text: '14:00' },
      { item_id: 10, item_text: '15:00' },
      { item_id: 11, item_text: '16:00' },
      { item_id: 12, item_text: '17:00' },
    ];
    this.dropdownListHoraFin = [
      { item_id: 1, item_text: '6:00' },
      { item_id: 2, item_text: '7:00' },
      { item_id: 3, item_text: '8:00' },
      { item_id: 4, item_text: '9:00' },
      { item_id: 5, item_text: '10:00' },
      { item_id: 6, item_text: '11:00' },
      { item_id: 7, item_text: '12:00' },
      { item_id: 8, item_text: '13:00' },
      { item_id: 9, item_text: '14:00' },
      { item_id: 10, item_text: '15:00' },
      { item_id: 11, item_text: '16:00' },
      { item_id: 12, item_text: '17:00' },
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

    this.dropdownSettingsHoraFin = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Eliminar todos',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}



