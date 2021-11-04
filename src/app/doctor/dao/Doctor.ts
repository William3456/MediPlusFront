export class DoctorInterface {
  id?:               number;
  userID!:           UserID;
  speciality!:       string;
  identificationID!: IdentificationID;
  numID!:            string;
  numRegDoc!:        string;
  availability!:     string;
  status!:           Status;
  createdAt?:        Date;
  updatedAt?:        Date;
}

export interface IdentificationID {
  id:          number;
  description?: string;
  status?:      Status;
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

export interface diaInterface {
  item_ids?: [];
  item_value?: string;
}
