export interface Glucosa {
  id:        number;
  measure:   number;
  units:     Status;
  date:      Date;
  time:      string;
  userID:    UserID;
  status:    Status;
  createdAt: null;
  updatedAt: null;
}

export interface Status {
  id:          number;
  description: string;
}

export interface UserID {
  id:        number;
  name:      string;
  email:     string;
  password:  string;
  remember:  number;
  userType:  number;
  status:    Status;
  createdAt: null;
  updatedAt: Date;
}
