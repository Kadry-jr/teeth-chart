import { Component, OnInit } from '@angular/core';
import { DentistService } from '../../services/dentist.service';
import { Dentist } from '../../models/dentist';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectedDentist: Dentist | null = null;

  constructor(private dentistService: DentistService) { }

  ngOnInit(): void {
    this.dentistService.selectedDentist$.subscribe(dentist => {
      this.selectedDentist = dentist;
    });
  }
}