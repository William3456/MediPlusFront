export interface HorarioDocInterface {
  doctor_id:   ID;
    startTime?:  string;
    finishTime?: string;
    day_id:      ID;
    rangoCita?:  number;
}

export interface ID {
    id: number;
}
