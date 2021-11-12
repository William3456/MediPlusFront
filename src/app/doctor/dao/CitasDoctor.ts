export interface CitasDocInterface {
  id:               number;
  patient_id:        PatientIDClass;
  doctor_id:         doctor_id;
  doctorScheduleID: DoctorScheduleID;
  justification:    string;
  appointment_date:  Date;
  appointment_time:  string;
  status:           Status;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface doctor_id {
  id:               number;
  userID:           user_id;
  speciality:       string;
  identificationID: clinic_id;
  numID:            string;
  numRegDoc:        string;
  clinic_id:         clinic_id;
  status:           Status;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface clinic_id {
  id:            number;
  description?:   string;
  departmentID?: clinic_id;
  status:        Status;
}

export interface Status {
  id:          number;
  description: Description;
}

export enum Description {
  Activo = "ACTIVO",
  Martes = "Martes",
}

export interface PatientIDClass {
  id:        number;
  name:      string;
  email:     string;
  password:  string;
  remember:  number;
  userType:  number;
  status:    Status;
  createdAt: Date | null;
  updatedAt: Date;
}

export interface user_id {
  id:        number;
  name:      string;
  email:     string;
  password:  string;
  remember:  number;
  userType:  number;
  status:    Status;
  createdAt: Date | null;
  updatedAt: Date;
}

export interface DoctorScheduleID {
  id:         number;
  doctorID:   doctor_id;
  startTime:  string;
  finishTime: string;
  dayID:      Status;
  rangoCita:  number;
}
