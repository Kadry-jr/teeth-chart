import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dental-chart-quick-look',
  templateUrl: './dental-chart-quick-look.component.html',
  styleUrls: ['./dental-chart-quick-look.component.scss']
})
export class DentalChartQuickLookComponent {
  @Input() selectedTeeth: number[] = [];
  @Input() doctor: string = '';
  @Input() priority: string = '';
  @Input() status: string = '';
  @Input() allSelected: boolean = false;
  @Output() selectAll = new EventEmitter<void>();
  @Output() deselectAll = new EventEmitter<void>();
  @Output() addOperation = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<string>();

  statusOptions: string[] = ['To Do', 'In Progress', 'Completed'];

  get selectedTeethDisplay(): string {
    if (this.allSelected) {
      return 'All';
    } else if (this.selectedTeeth.length === 1) {
      return this.selectedTeeth[0].toString();
    } else if (this.selectedTeeth.length > 1) {
      return `${this.selectedTeeth.length} selected`;
    } else {
      return 'None';
    }
  }

  onSelectAll() {
    this.selectAll.emit();
  }

  onDeselectAll() {
    this.deselectAll.emit();
  }

  onAddOperation() {
    this.addOperation.emit();
  }

  onStatusChange(newStatus: string) {
    this.statusChange.emit(newStatus);
  }
}
