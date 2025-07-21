import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Operation } from '../../models/operation';
import { Dentist } from '../../models/dentist';
import { OperationService } from '../../services/operation.service';
import { DentistService } from '../../services/dentist.service';
import { PatientService } from '../../services/patient.service';
import { ToothService } from '../../services/tooth.service';

@Component({
  selector: 'app-operation-modal',
  templateUrl: './operation-modal.component.html',
  styleUrls: ['./operation-modal.component.scss']
})
export class OperationModalComponent implements OnInit {
  operationForm: FormGroup;
  isNew: boolean;
  teethNumbers: number[] = [];
  dentists: Dentist[] = [];

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  years: number[] = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private dentistService: DentistService,
    private patientService: PatientService,
    private toothService: ToothService,
    public dialogRef: MatDialogRef<OperationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isNew = data.isNew;
    
    if (this.isNew) {
      this.teethNumbers = data.teethNumbers || [];
    } else {
      this.teethNumbers = data.operation.teethNumbers || [];
    }
    
    this.operationForm = this.fb.group({
      title: ['', Validators.required],
      code: [''],
      dentistId: [null, Validators.required],
      priority: [3, Validators.required],
      status: ['To Do', Validators.required],
      plannedDay: [null, Validators.required],
      plannedMonth: [null, Validators.required],
      plannedYear: [null, Validators.required],
      completionDate: [null],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.dentists = this.dentistService.getDentists();
    
    // Set current dentist as default if available
    const selectedDentist = this.dentistService.selectedDentist$;
    selectedDentist.subscribe(dentist => {
      if (dentist) {
        this.operationForm.get('dentistId')?.setValue(dentist.id);
      }
    });
    
    if (!this.isNew && this.data.operation) {
      // When editing, populate the form with existing data
      const plannedDate = new Date(this.data.operation.plannedStartDate);
      this.operationForm.patchValue({
        title: this.data.operation.title,
        code: this.data.operation.code,
        dentistId: this.data.operation.dentistId,
        priority: this.data.operation.priority,
        status: this.data.operation.status,
        plannedDay: plannedDate.getDate(),
        plannedMonth: plannedDate.getMonth() + 1,
        plannedYear: plannedDate.getFullYear(),
        completionDate: this.data.operation.completionDate,
        notes: this.data.operation.notes
      });
    }
  }

  onSubmit(): void {
    if (this.operationForm.invalid) {
      return;
    }
    
    const selectedPatient = this.patientService.selectedPatient$;
    const currentPatientId = 0; 
    
    selectedPatient.subscribe(patient => {
      if (patient) {
        this.processFormSubmission(patient.id);
      } else {
        this.processFormSubmission(currentPatientId);
      }
    });
  }

  private processFormSubmission(patientId: number): void {
    const formValue = this.operationForm.value;
    const plannedStartDate = new Date(
      formValue.plannedYear,
      formValue.plannedMonth - 1,
      formValue.plannedDay
    );
    const operation: Operation = {
      id: this.isNew ? 0 : this.data.operation.id,
      patientId: patientId,
      teethNumbers: this.teethNumbers,
      title: formValue.title,
      code: formValue.code,
      dentistId: formValue.dentistId,
      priority: formValue.priority,
      status: formValue.status,
      plannedStartDate: plannedStartDate,
      completionDate: formValue.completionDate,
      creationDate: this.isNew ? new Date() : this.data.operation.creationDate,
      notes: formValue.notes
    };
    
    if (this.isNew) {
      this.operationService.addOperation(operation);
    } else {
      this.operationService.updateOperation(operation);
    }
    
    // Clear selection in tooth service
    this.toothService.clearSelections();
    
    this.dialogRef.close(operation);
  }
}