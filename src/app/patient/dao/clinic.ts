export interface ClinicInterface {
  id?:             number;
  description:    string;
  department_id: departmentId;
  status:         Status;
}

export interface Status {
  id:          number;
  description?: string;
}

export interface departmentId {
  id:          number;
  description?: string;
  status?:      Status;
}
