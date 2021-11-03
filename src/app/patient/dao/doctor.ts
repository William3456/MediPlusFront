export interface DoctorInterface {
  id:                number;
  user_id:           UserID;
  speciality:        string;
  identification_id: ID;
  num_id:            string;
  num_reg_doc:       string;
  clinic_id:         ID;
  status:            Status;
  created_at:        Date;
  updated_at:        Date;
}

export interface ID {
  id:             number;
  description:    string;
  department_id?: ID;
  status:         Status;
}

export interface Status {
  id:          number;
  description: string;
}

export interface UserID {
  id:         number;
  name:       string;
  email:      string;
  password:   string;
  remember:   number;
  user_type:  number;
  status:     Status;
  created_at: Date;
  updated_at: Date;
}
