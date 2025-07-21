import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tooth } from '../models/tooth';

@Injectable({
  providedIn: 'root'
})
export class ToothService {
  private teeth: Tooth[] = [];
  
  private teethSubject = new BehaviorSubject<Tooth[]>([]);
  teeth$ = this.teethSubject.asObservable();
  
  private selectedTeethSubject = new BehaviorSubject<number[]>([]);
  selectedTeeth$ = this.selectedTeethSubject.asObservable();

  constructor() {
    this.initializeTeeth();
    
    // Load any stored tooth conditions
    const storedTeeth = localStorage.getItem('teeth');
    if (storedTeeth) {
      this.teeth = JSON.parse(storedTeeth);
      this.updateTeethSubject();
    }
  }

  private initializeTeeth(): void {
    // Create all 32 teeth (FDI notation)
    // Upper right (18-11)
    for (let i = 18; i >= 11; i--) {
      this.teeth.push({
        number: i,
        selected: false
      });
    }
    
    // Upper left (21-28)
    for (let i = 21; i <= 28; i++) {
      this.teeth.push({
        number: i,
        selected: false
      });
    }

      // Lower right (41-48)
      for (let i = 48; i >= 41; i--) {
        this.teeth.push({
          number: i,
          selected: false
        });
      }
      
    // Lower left (38-31)
    for (let i = 31; i <= 38; i++) {
      this.teeth.push({
        number: i,
        selected: false
      });
    }
    
  
    this.updateTeethSubject();
  }

  getTeeth(): Tooth[] {
    return this.teeth;
  }

  getTooth(number: number): Tooth | undefined {
    return this.teeth.find(tooth => tooth.number === number);
  }

  toggleToothSelection(toothNumber: number): void {
    const tooth = this.getTooth(toothNumber);
    if (tooth) {
      tooth.selected = !tooth.selected;
      this.updateSelectedTeethSubject();
    }
  }

  selectAllTeeth(selected: boolean): void {
    this.teeth.forEach(tooth => tooth.selected = selected);
    this.updateSelectedTeethSubject();
  }

  getSelectedTeethNumbers(): number[] {
    return this.teeth
      .filter(tooth => tooth.selected)
      .map(tooth => tooth.number);
  }

  clearSelections(): void {
    this.teeth.forEach(tooth => tooth.selected = false);
    this.updateSelectedTeethSubject();
  }

  private updateTeethSubject(): void {
    this.teethSubject.next([...this.teeth]);
  }

  private updateSelectedTeethSubject(): void {
    this.selectedTeethSubject.next(this.getSelectedTeethNumbers());
  }

  private saveTeethToStorage(): void {
    localStorage.setItem('teeth', JSON.stringify(this.teeth));
  }
}