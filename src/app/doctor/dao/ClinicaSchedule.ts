export interface ClinicSchedule {
  id:           number;
  clinic_id:     ID;
  start_time:    string;
  finish_time:   string;
  receso_inicio: string;
  receso_fin:    string;
  day_id:        DayID;
}

export interface ID {
  id:            number;
  description:   string;
  department_id?: ID;
  status:        DayID;
}

export interface DayID {
  id:          number;
  description: string;
}
