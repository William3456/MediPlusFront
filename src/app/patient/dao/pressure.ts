export interface PressureInterface {
  id?:                number;
  date:               Date;
  time:               string;
  systolic_pressure:  number;
  diastolic_pressure: number;
  heart_rate:         number;
  comments:           string;
  user_id:            UserID;
  status:             Status;
  created_at?:         null;
  updated_at?:         null;
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
