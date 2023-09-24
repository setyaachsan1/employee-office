import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from "primeng/button";
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeeDetailComponent,
    AddEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastModule,
    ButtonModule,
    PaginatorModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
