import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { DentalChartComponent } from './components/dental-chart/dental-chart.component';
import { OperationTableComponent } from './components/operation-table/operation-table.component';
import { OperationModalComponent } from './components/operation-modal/operation-modal.component';

// Services
import { PatientService } from './services/patient.service';
import { DentistService } from './services/dentist.service';
import { OperationService } from './services/operation.service';
import { ToothService } from './services/tooth.service';
import { DentalChartImageComponent } from './components/dental-chart-image/dental-chart-image.component';
import { DentalChartQuickLookComponent } from './components/dental-chart-quick-look/dental-chart-quick-look.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientInfoComponent,
    DentalChartComponent,
    OperationTableComponent,
    OperationModalComponent,
    DentalChartImageComponent,
    DentalChartQuickLookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatMenuModule,
    MatBadgeModule
  ],
  providers: [
    PatientService,
    DentistService,
    OperationService,
    ToothService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }