import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tooth } from '../../models/tooth';
import { ToothService } from '../../services/tooth.service';
import { OperationModalComponent } from '../operation-modal/operation-modal.component';

@Component({
  selector: 'app-dental-chart',
  templateUrl: './dental-chart.component.html',
  styleUrls: ['./dental-chart.component.scss']
})
export class DentalChartComponent implements OnInit {
  upperTeeth: Tooth[] = [];
  lowerTeeth: Tooth[] = [];
  allTeethSelected = false;
  selectedTeethCount = 0;
  @ViewChild('imageEditSection') imageEditSection!: ElementRef;
  isFullscreen = false;
  imageSrc = 'https://static.wixstatic.com/media/52da0a_647a2cf72c024ce698ce7986e728663a~mv2.jpeg';

  selectedTeeth: number[] = [];
  selectedDoctor: string = 'Dr. Smith'; // Placeholder, replace with real doctor selection logic
  selectedPriority: string = 'High';    // Placeholder, replace with real priority logic
  selectedStatus: string = 'To Do';   // Default to 'To Do' for consistency

  constructor(
    private toothService: ToothService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.toothService.teeth$.subscribe(teeth => {
      this.upperTeeth = teeth.filter(tooth => 
        (tooth.number >= 11 && tooth.number <= 18) || 
        (tooth.number >= 21 && tooth.number <= 28)
      );
      
      this.lowerTeeth = teeth.filter(tooth => 
        (tooth.number >= 31 && tooth.number <= 38) || 
        (tooth.number >= 41 && tooth.number <= 48)
      );
    });
    
    this.toothService.selectedTeeth$.subscribe(selectedTeeth => {
      this.selectedTeethCount = selectedTeeth.length;
      this.allTeethSelected = selectedTeeth.length === 32;
      this.selectedTeeth = selectedTeeth;
    });

    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

  toggleToothSelection(toothNumber: number): void {
    this.toothService.toggleToothSelection(toothNumber);
  }

  toggleSelectAllTeeth(checked: boolean): void {
    this.toothService.selectAllTeeth(checked);
    this.allTeethSelected = checked;
  }

  toggleFullscreen(): void {
    if (!this.isFullscreen) {
      const elem = this.imageEditSection.nativeElement as HTMLElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
      this.isFullscreen = true;
    } 
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

  addOperation(): void {
    const selectedTeeth = this.toothService.getSelectedTeethNumbers();
    
    if (selectedTeeth.length > 0) {
      this.dialog.open(OperationModalComponent, {
        width: '600px',
        panelClass: 'centered-dialog',
        data: { 
          teethNumbers: selectedTeeth,
          isNew: true
        }
      });
    }
  }

  onQuickLookStatusChange(newStatus: string) {
    this.selectedStatus = newStatus;
  }

  getToothPath(area: string): string {
    switch(area) {
      case 'top':
        return 'M20,5 L30,15 L10,15 Z';
      case 'bottom':
        return 'M10,25 L30,25 L20,35 Z';
      case 'left':
        return 'M5,20 L15,10 L15,30 Z';
      case 'right':
        return 'M25,10 L35,20 L25,30 Z';
      case 'center':
      default:
        return 'M15,15 L25,15 L25,25 L15,25 Z';
    }
  }

  getConditionColor(conditionType: string): string {
    switch(conditionType) {
      case 'cavity':
        return '#FF6B6B'; // Red for decay
      case 'filling':
        return '#4ECDC4'; // Teal for fillings
      case 'missing':
        return '#EFEFEF'; // Light gray for missing
      case 'normal':
      default:
        return '#FFFFFF'; // White for normal
    }
  }
}