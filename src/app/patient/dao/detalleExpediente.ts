export interface detalleExpInterface {
  id?:             number;
  appointment_id: AppointmentID;
  detailType_id?:  DetailTypeIDClass;
  description?:    string;
  status?:         Status;
}

export interface AppointmentID {
  id:                      number;
  patient_id?:              PatientIDClass;
  doctor_id?:               DoctorID;
  doctor_schedule_id?:      DoctorScheduleID;
  justification?:           string;
  appointment_date?:        Date;
  appointment_time?:        string;
  appointment_time_finish?: string;
  status?:                  Status;
  created_at?:              Date;
  updated_at?:              Date;
}

export interface DoctorID {
  id:                number;
  user_id?:           PatientIDClass;
  speciality?:        string;
  identification_id?: DetailTypeIDClass;
  num_id?:            string;
  num_reg_doc?:       string;
  clinic_id?:         DetailTypeIDClass;
  status?:            Status;
  created_at?:        Date;
  updated_at?:        Date;
}

export interface DetailTypeIDClass {
  id:             number;
  description?:    string;
  department_id?: DetailTypeIDClass;
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
