import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departments: any[]= [];
  employeeList: any[]=[];
  isListView: boolean = true;
  employeeObject: any ={
    "firstName":"",
    "lastName": "", 
    "departmentId": "",
    "gender":"",
    "email":"",
    "phoneNo":""
  }
  constructor(private http: HttpClient,
    private route: Router) {

  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments() {
    this.http.get("http://localhost:3001/departments").subscribe((res:any)=>{ 
      this.departments =  res;
      console.log(res)
    })
  }

  logout(){
    this.route.navigateByUrl('/');
  }

  loadEmployees() {
    this.http.get("http://localhost:3000/data").subscribe((res: any)=>{
      this.employeeList = res;
      console.log(res)
    })
  }

  onCreateEmp() {
    debugger;
    // this.http.post("assets/postEmployee.json", this.employeeObject).subscribe((res:any)=>{
    //   alert(res.message)
    // })
    this.http.get("assets/utils/postEmployee.json").subscribe((res:any)=>{
      alert(res.message)
      this.loadEmployees();
    })
  }

  onEdit(item: any) { 
    debugger;
    this.employeeObject = item;
    this.isListView = false;
  }
  onDelete(item: any) {

  }

}
