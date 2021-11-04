export interface CitasDocInterface {
  id:               number;
  patient_id:        ID;
  doctorID:         ID;
  doctorScheduleID: DoctorScheduleID;
  justification:    string;
  appointment_date:  Date;
  appointment_time:  string;
  status:           Status;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface ID {
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

export interface Status {
  id:          number;
  description: string;
}

export interface DoctorScheduleID {
  id:         number;
  doctorID:   null;
  startTime:  string;
  finishTime: string;
  dayID:      Status;
  rangoCita:  number;
}
