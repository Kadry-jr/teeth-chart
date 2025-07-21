export interface Operation {
  id: number;
  patientId: number;
  title: string;
  code: string;
  dentistId: number;
  status: string;
  teethNumbers: number[];
  priority: 1 | 2 | 3 | 4 | 5;
  creationDate: Date;
  plannedStartDate: Date;
  actualStartDate?: Date;
  completionDate?: Date;
  notes: string;
}