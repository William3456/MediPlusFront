export interface HorarioInterface {
  id?:          number;
  doctor_id:   DoctorID;
  start_time:  string;
  finish_time: string;
  day_id:      DayID;
  rango_cita:  number;
}

export interface DayID {
  id:          number;
  description?: string;
}

export interface DoctorID {
  id:                number;
  user_id?:           UserID;
  speciality?:        string;
  identification_id?: ID;
  num_id?:            string;
  num_reg_doc?:       string;
  clinic_id?:         ID;
  status?:            DayID;
  created_at?:        Date;
  updated_at?:        Date;
}

export interface ID {
  id:             number;
  description?:    string;
  department_id?: ID;
  status?:         DayID;
}

export interface UserID {
  id:         number;
  name?:       string;
  email?:      string;
  password?:   string;
  remember?:   number;
  user_type?:  number;
  status?:     DayID;
  created_at?: null;
  updated_at?: Date;
}
