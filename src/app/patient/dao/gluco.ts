export interface GlucoseInterface {
  id?:         number;
  measure:    number;
  units:      Units;
  date:       Date;
  time:       string;
  user_id:    UserID;
  status:     Status;
  created_at?: null;
  updated_at?: null;
}
export interface Units {
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
export interface Status {
  id:          number;
  description?: string;
}


