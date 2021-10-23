export interface RecordInterface {
  id?:               number;
  user_id:           UserID;
  phone:             string;
  address:           string;
  profession:        string;
  weight:            number;
  height:            number;
  date_birth:        Date;
  gender:            string;
  identification_id: IdentificationID;
  num_id:            string;
  status:            Status;
  created_at?:        Date;
  updated_at?:        Date;
}

export interface IdentificationID {
  id:          number;
  description?: string;
  status?:      Status;
}

export interface Status {
  id:          number;
  description?: string;
}

export interface UserID {
  id:         number;
  name?:       string;
  email?:      string;
  password?:   string;
  remember?:   number;
  user_type?:  number;
  status?:     Status;
  created_at?: null;
  updated_at?: Date;
}
