import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dental-chart-image',
  templateUrl: './dental-chart-image.component.html',
  styleUrls: ['./dental-chart-image.component.scss']
})
export class DentalChartImageComponent {
  @Input() selectedTeeth: number[] = [];
  @Input() upperTeeth: { number: number, selected: boolean }[] = [];
  @Input() lowerTeeth: { number: number, selected: boolean }[] = [];
  @Input() imageSrc: string = '';
  @Output() selectedTeethChange = new EventEmitter<number[]>();
  @Output() toothToggled = new EventEmitter<number>();

  onToothClick(toothNumber: number) {
    this.toothToggled.emit(toothNumber);
  }
}
