import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'employee-detail',
    component: EmployeeDetailComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
