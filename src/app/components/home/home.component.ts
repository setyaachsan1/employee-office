import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})

export class HomeComponent implements OnInit {
  forEdit:boolean=false;
  forNew:boolean=false;
  departments: any[]= [];
  employeeList: any[]=[];
  employeeDetailList: any[]=[];
  employeeObject: any ={
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
    private http: HttpClient,
    private route: Router) {

  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  logout(){
    this.route.navigateByUrl('/');
  }

  loadEmployees() {
    this.http.get("http://localhost:3000/data").subscribe((res: any)=>{
      this.employeeList = res;
    })
  }

  onEdit(item: any) { 
    this.forEdit = true;
    this.employeeObject = item;
    this.employeeDetailList.push(this.employeeObject);
    localStorage.setItem('employeeDetailList',JSON.stringify(this.employeeDetailList));
    localStorage.setItem('forEdit',JSON.stringify(this.forEdit));
    this.employeeObject = {
      username: item.username,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      bod: item.bod,
      salary: item.salary,
      status: item.status,
      group: item.group,
      desc: item.desc,
   };

    if(item){
      this.route.navigateByUrl('/employee-detail');
    }

  }
  onDelete(item: any) {

  }

  isListView(){
    localStorage.setItem('forNew',JSON.stringify(this.forNew));
    this.route.navigateByUrl('/add-employee');
  }

}
