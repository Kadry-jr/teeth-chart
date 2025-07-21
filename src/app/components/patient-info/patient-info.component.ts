import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  selectedPatient: Patient | null = null;
  patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patients = this.patientService.getPatients();
    
    this.patientService.selectedPatient$.subscribe(patient => {
      this.selectedPatient = patient;
    });
  }

  openPatientSelector(): void {
    
  }

  onPatientSelected(patientId: number): void {
    const patient = this.patientService.getPatientById(patientId);
    if (patient) {
      this.patientService.selectPatient(patient);
    }
  }
}