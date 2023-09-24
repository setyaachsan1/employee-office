import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [MessageService]
})
export class AddEmployeeComponent implements OnInit {

  employeeSubmit: any ={
    "username":"",
    "firstName":"",
    "lastName": "", 
    "email":"",
    "bod":"",
    "salary":"",
    "status":"",
    "group":"",
    "desc":"",
  }

  constructor(
    private route: Router,
    private http: HttpClient,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onCreateEmp() {
    let payload = {
      username: this.employeeSubmit.username,
      firstName: this.employeeSubmit.firstName,
      lastName: this.employeeSubmit.lastName,
      email: this.employeeSubmit.email,
      bod: this.employeeSubmit.bod,
      salary: this.employeeSubmit.salary,
      status: this.employeeSubmit.status,
      group: this.employeeSubmit.group,
      desc: this.employeeSubmit.desc,
    }

    if(!payload.username || !payload.firstName || !payload.lastName || !payload.email || !payload.bod){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please Fill the mandatory field!' });
    } else {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Created Succefully!' });
      setTimeout(() => {
        this.route.navigateByUrl('/home');
      }, 3000);
    }  
     } 

  back(){
    this.route.navigateByUrl('/home');
  }

}
