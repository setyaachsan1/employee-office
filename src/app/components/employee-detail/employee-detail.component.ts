import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
  providers: [MessageService]
})

export class EmployeeDetailComponent implements OnInit {
 
  employeeList: any[]=[];
  isListView: boolean = true;
  employeeObject: any ={
    "username":"",
    "firstName":"",
    "lastName": "", 
    "email":"",
    "bod":"",
    "salary":"",
    "status":"",
    "group":"",
  }

  constructor(
    private route: Router,
    private http: HttpClient,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    const dateNow = new Date();
    console.log(dateNow)
    this.employeeObject.description=dateNow;

    const empData = localStorage.getItem('employeeDetailList');
    if(empData !=null){
      this.employeeList = JSON.parse(empData);
      for (const item of this.employeeList) {
       this.employeeObject.username=item.username
       this.employeeObject.firstName=item.firstName
       this.employeeObject.lastName=item.lastName
       this.employeeObject.email=item.email
       this.employeeObject.bod=item.bod
       this.employeeObject.salary=item.salary
       this.employeeObject.status=item.status
       this.employeeObject.group=item.group
    }
   }

  }

  onCreateEmp() {
    let payload = {
      username: this.employeeObject.username,
      firstName: this.employeeObject.firstName,
      lastName: this.employeeObject.lastName,
      email: this.employeeObject.email,
      bod: this.employeeObject.bod,
      salary: this.employeeObject.salary,
      status: this.employeeObject.status,
      group: this.employeeObject.group,
      desc: this.employeeObject.desc,
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

  onEdit(item: any) { 
    this.employeeObject = item;
    this.isListView = false;
  }
  onDelete(item: any) {

  }

}
