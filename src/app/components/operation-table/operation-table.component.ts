import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Operation } from '../../models/operation';
import { OperationService } from '../../services/operation.service';
import { DentistService } from '../../services/dentist.service';
import { OperationModalComponent } from '../operation-modal/operation-modal.component';

@Component({
  selector: 'app-operation-table',
  templateUrl: './operation-table.component.html',
  styleUrls: ['./operation-table.component.scss']
})
export class OperationTableComponent implements OnInit {
  operations: Operation[] = [];
  displayedColumns: string[] = [
    'description', 
    'teeth', 
    'priority', 
    'dentist', 
    'plannedDate', 
    'startDate', 
    'notes', 
    'status', 
    'actions'
  ];

  constructor(
    private operationService: OperationService,
    private dentistService: DentistService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.operationService.operations$.subscribe(operations => {
      this.operations = operations;
    });
  }

  getDentistName(dentistId: number): string {
    const dentist = this.dentistService.getDentistById(dentistId);
    return dentist ? dentist.name : 'Unknown';
  }

  formatTeethNumbers(teethNumbers: number[]): string {
    if (!teethNumbers || teethNumbers.length === 0) {
      return 'None';
    }
    
    // Sort numbers for better readability
    const sortedNumbers = [...teethNumbers].sort((a, b) => a - b);
    
    // If there are too many teeth, show a summary
    if (sortedNumbers.length > 5) {
      return `${sortedNumbers.slice(0, 3).join(', ')} + ${sortedNumbers.length - 3} more`;
    }
    
    return sortedNumbers.join(', ');
  }

  editOperation(operation: Operation): void {
    this.dialog.open(OperationModalComponent, {
      width: '500px',
      data: { 
        operation,
        isNew: false
      }
    });
  }

  deleteOperation(operation: Operation): void {
    if (confirm('Are you sure you want to delete this operation?')) {
      this.operationService.deleteOperation(operation.id);
    }
  }
}