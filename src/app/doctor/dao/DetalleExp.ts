export interface detalleExpeInterface {
  appointment_id: ID;
  detailType_id?:  ID;
  description?:    string;
  status?:         ID;
}

export interface ID {
  id: number;
}
