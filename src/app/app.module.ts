import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
// import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
// import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartComponent } from './chart/chart.component';
import { UserFormModule } from './user-form/user-form.module';
@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    // UserFormComponent,
    ChartComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,      
    MatSelectModule,    
    MatOptionModule,  
    MatProgressSpinnerModule,
    UserFormModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
