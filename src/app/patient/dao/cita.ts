export class CitaInterface {
  id?:                      number;
  patient_id!:              PatientIDClass;
  doctor_id!:               DoctorID;
  doctor_schedule_id!:      DoctorScheduleID;
  justification!:           string;
  appointment_date!:        Date;
  appointment_time!:        string;
  appointment_time_finish!: string;
  status!:                  Status;
  created_at?:              Date;
  updated_at?:              Date;
}

export interface DoctorID {
  id:                number;
  user_id?:           PatientIDClass;
  speciality?:        string;
  identification_id?: ClinicIDClass;
  num_id?:            string;
  num_reg_doc?:       string;
  clinic_id?:         ClinicIDClass;
  status?:            Status;
  created_at?:        Date;
  updated_at?:        Date;
}

export interface ClinicIDClass {
  id:             number;
  description?:    string;
  department_id?: ClinicIDClass;
  status?:         Status;
}

export interface Status {
  id:          number;
  description?: string;
}



export interface PatientIDClass {
  id:         number;
  name?:       string;
  email?:      string;
  password?:   string;
  remember?:   number;
  user_type?:  number;
  status?:     Status;
  created_at?: Date | null;
  updated_at?: Date;
}

export interface DoctorScheduleID {
  id:          number;
  doctor_id?:   DoctorID;
  start_time?:  string;
  finish_time?: string;
  day_id?:      Status;
  rango_cita?:  number;
}
