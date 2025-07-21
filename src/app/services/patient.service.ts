import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients: Patient[] = [
    { id: 1, name: 'John Doe', phoneNumber: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phoneNumber: '234-567-8901' },
    { id: 3, name: 'Michael Johnson', phoneNumber: '345-678-9012' }
  ];

  private selectedPatientSubject = new BehaviorSubject<Patient | null>(null);
  selectedPatient$ = this.selectedPatientSubject.asObservable();

  constructor() {
    // Initialize with stored patients or default ones
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      this.patients = JSON.parse(storedPatients);
    } else {
      this.savePatientsToStorage();
    }

    // Set initial selected patient
    const storedSelectedPatientId = localStorage.getItem('selectedPatientId');
    if (storedSelectedPatientId) {
      const patientId = parseInt(storedSelectedPatientId, 10);
      const patient = this.getPatientById(patientId);
      if (patient) {
        this.selectedPatientSubject.next(patient);
      }
    }
  }

  getPatients(): Patient[] {
    return this.patients;
  }

  getPatientById(id: number): Patient | undefined {
    return this.patients.find(p => p.id === id);
  }

  selectPatient(patient: Patient): void {
    localStorage.setItem('selectedPatientId', patient.id.toString());
    this.selectedPatientSubject.next(patient);
  }

  addPatient(patient: Patient): void {
    // Ensure unique ID
    patient.id = this.getNextId();
    this.patients.push(patient);
    this.savePatientsToStorage();
  }

  updatePatient(patient: Patient): void {
    const index = this.patients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      this.patients[index] = patient;
      this.savePatientsToStorage();
      
      // Update selected patient if it's the one being modified
      if (this.selectedPatientSubject.value?.id === patient.id) {
        this.selectedPatientSubject.next(patient);
      }
    }
  }

  deletePatient(id: number): void {
    this.patients = this.patients.filter(p => p.id !== id);
    this.savePatientsToStorage();
    
    // Clear selected patient if it's the one being deleted
    if (this.selectedPatientSubject.value?.id === id) {
      this.selectedPatientSubject.next(null);
      localStorage.removeItem('selectedPatientId');
    }
  }

  private savePatientsToStorage(): void {
    localStorage.setItem('patients', JSON.stringify(this.patients));
  }

  private getNextId(): number {
    return this.patients.length ? Math.max(...this.patients.map(p => p.id)) + 1 : 1;
  }
}