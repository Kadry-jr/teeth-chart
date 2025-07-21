import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dentist } from '../models/dentist';

@Injectable({
  providedIn: 'root'
})
export class DentistService {
  private dentists: Dentist[] = [
    { id: 1, name: 'Dr. Smith' },
    { id: 2, name: 'Dr. Johnson' },
    { id: 3, name: 'Dr. Williams' },
    { id: 4, name: 'Dr. Brown' }
  ];

  private selectedDentistSubject = new BehaviorSubject<Dentist | null>(null);
  selectedDentist$ = this.selectedDentistSubject.asObservable();

  constructor() {
    const storedDentists = localStorage.getItem('dentists');
    if (storedDentists) {
      this.dentists = JSON.parse(storedDentists);
    } else {
      this.saveDentistsToStorage();
    }

    // Set initial selected dentist
    const storedSelectedDentistId = localStorage.getItem('selectedDentistId');
    if (storedSelectedDentistId) {
      const dentistId = parseInt(storedSelectedDentistId, 10);
      const dentist = this.getDentistById(dentistId);
      if (dentist) {
        this.selectedDentistSubject.next(dentist);
      }
    }
  }

  getDentists(): Dentist[] {
    return this.dentists;
  }

  getDentistById(id: number): Dentist | undefined {
    return this.dentists.find(d => d.id === id);
  }

  selectDentist(dentist: Dentist): void {
    localStorage.setItem('selectedDentistId', dentist.id.toString());
    this.selectedDentistSubject.next(dentist);
  }

  addDentist(dentist: Dentist): void {
    // Ensure unique ID
    dentist.id = this.getNextId();
    this.dentists.push(dentist);
    this.saveDentistsToStorage();
  }

  updateDentist(dentist: Dentist): void {
    const index = this.dentists.findIndex(d => d.id === dentist.id);
    if (index !== -1) {
      this.dentists[index] = dentist;
      this.saveDentistsToStorage();
      
      // Update selected dentist if it's the one being modified
      if (this.selectedDentistSubject.value?.id === dentist.id) {
        this.selectedDentistSubject.next(dentist);
      }
    }
  }

  deleteDentist(id: number): void {
    this.dentists = this.dentists.filter(d => d.id !== id);
    this.saveDentistsToStorage();
    
    // Clear selected dentist if it's the one being deleted
    if (this.selectedDentistSubject.value?.id === id) {
      this.selectedDentistSubject.next(null);
      localStorage.removeItem('selectedDentistId');
    }
  }

  private saveDentistsToStorage(): void {
    localStorage.setItem('dentists', JSON.stringify(this.dentists));
  }

  private getNextId(): number {
    return this.dentists.length ? Math.max(...this.dentists.map(d => d.id)) + 1 : 1;
  }
}