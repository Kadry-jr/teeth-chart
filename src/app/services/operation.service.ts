import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private operations: Operation[] = [];
  private operationsSubject = new BehaviorSubject<Operation[]>([]);
  operations$ = this.operationsSubject.asObservable();

  constructor() {
    // Initialize with stored operations
    const storedOperations = localStorage.getItem('operations');
    if (storedOperations) {
      const parsedOperations = JSON.parse(storedOperations);
      
      // Convert string dates back to Date objects
      this.operations = parsedOperations.map((op: any) => ({
        ...op,
        creationDate: new Date(op.creationDate),
        plannedStartDate: new Date(op.plannedStartDate),
        actualStartDate: op.actualStartDate ? new Date(op.actualStartDate) : undefined,
        completionDate: op.completionDate ? new Date(op.completionDate) : undefined
      }));
    }
    
    this.updateOperationsSubject();
  }

  getOperations(): Operation[] {
    return this.operations;
  }

  getOperationsByPatientId(patientId: number): Operation[] {
    // This would filter by patient if we had patient IDs in operations
    // For now, we'll return all operations since we're managing by selected dentist/patient
    return this.operations;
  }

  getOperationById(id: number): Operation | undefined {
    return this.operations.find(op => op.id === id);
  }

  addOperation(operation: Operation): void {
    // Ensure unique ID
    operation.id = this.getNextId();
    this.operations.push(operation);
    this.saveOperationsToStorage();
    this.updateOperationsSubject();
  }

  updateOperation(operation: Operation): void {
    const index = this.operations.findIndex(op => op.id === operation.id);
    if (index !== -1) {
      this.operations[index] = operation;
      this.saveOperationsToStorage();
      this.updateOperationsSubject();
    }
  }

  deleteOperation(id: number): void {
    this.operations = this.operations.filter(op => op.id !== id);
    this.saveOperationsToStorage();
    this.updateOperationsSubject();
  }

  private saveOperationsToStorage(): void {
    localStorage.setItem('operations', JSON.stringify(this.operations));
  }

  private updateOperationsSubject(): void {
    this.operationsSubject.next([...this.operations]);
  }

  private getNextId(): number {
    return this.operations.length ? Math.max(...this.operations.map(op => op.id)) + 1 : 1;
  }
}