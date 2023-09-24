import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService,ConfirmationService } from 'primeng/api';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService,ConfirmationService]
})

export class HomeComponent implements OnInit {
  filteredAndSortedEmployeeList: any[] = [];
  sortIcon = faSort;
  pencilIcon= faPencil;
  trashIcon=faTrash;
  findIcon=faMagnifyingGlass;
  first: number = 0;
  rows: number = 10;
  page: number=1; // same as first
  count: number=0;
  sortbyusername: string = 'username';
  sortbyfirstname: string = 'firstName';
  sortbylastname: string = 'lastName';
  sortbyemail: string = 'email';
  sortOrder: number = 1; // 1 for ascending, -1 for descending
  userList:any;
  forEdit:boolean=false;
  forNew:boolean=false;
  departments: any[]= [];
  employeeList: any[]=[];
  employeeDetailList: any[]=[];
  pagedEmployeeList: any[] = [];
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
  searchText: string = '';
  userLogin:string='';
  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: Router) {

  }
  
  ngOnInit(): void {
    this.loadUser();
    this.loadEmployees();
    this.updatePagedEmployeeList();
    this.onSearch()
  }

  loadUser(){
    const user = localStorage.getItem('signUpUsers');
    console.log(user)
    if(user !=null){
      this.userList = JSON.parse(user);
      console.log(this.userList[0].userName)
      this.userLogin=this.userList[0].userName
      }
    }

  onSearch() {
    this.filterPagedEmployeeList();
}


  onPageChange(event:any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedEmployeeList();
  }

  onTableSizeChange(event:any):void{
    this.rows=event.target.value;
    this.first=1;
    this.loadEmployees()
  }

  logout(){
    this.route.navigateByUrl('/');
  }

  loadEmployees() {
    this.http.get("http://localhost:3000/data").subscribe((res: any)=>{
      this.employeeList = res;
      this.filteredAndSortedEmployeeList = [...this.employeeList]; // Copy the data
      this.updatePagedEmployeeList();
   
    })
  }

  updatePagedEmployeeList() {

    this.employeeList.sort((a, b) => {
      const fieldA = a[this.sortbyusername].toLowerCase();
      const fieldB = b[this.sortbyusername].toLowerCase();
      if (fieldA < fieldB ) {
        return -1 * this.sortOrder;
      } else if (fieldA > fieldB) {
        return 1 * this.sortOrder;
      } else {
        return 0;
      }
    });

    this.employeeList.sort((c, d) => {
      const fieldC = c[this.sortbyfirstname].toLowerCase();
      const fieldD = d[this.sortbyfirstname].toLowerCase();
      if (fieldC < fieldD ) {
        return -1 * this.sortOrder;
      } else if (fieldC > fieldD) {
        return 1 * this.sortOrder;
      } else {
        return 0;
      }
    });

    this.employeeList.sort((e, f) => {
      const fieldE = e[this.sortbylastname].toLowerCase();
      const fieldF = f[this.sortbylastname].toLowerCase();
      if (fieldE < fieldF ) {
        return -1 * this.sortOrder;
      } else if (fieldE > fieldF) {
        return 1 * this.sortOrder;
      } else {
        return 0;
      }
    });

    this.employeeList.sort((g, h) => {
      const fieldG = g[this.sortbyfirstname].toLowerCase();
      const fieldH = h[this.sortbyfirstname].toLowerCase();
      if (fieldG < fieldH ) {
        return -1 * this.sortOrder;
      } else if (fieldG > fieldH) {
        return 1 * this.sortOrder;
      } else {
        return 0;
      }
    });

    const startIndex = this.first;
    const endIndex = startIndex + this.rows;
    this.pagedEmployeeList = this.employeeList.slice(startIndex, endIndex);
  
  }

  filterPagedEmployeeList(){
    if (this.searchText.trim() !== '') {
      this.pagedEmployeeList = this.employeeList.filter((emp) => {
          const searchFields = [emp.username, emp.firstName, emp.lastName, emp.email];
          return searchFields.some((field) =>
              field.toLowerCase().includes(this.searchText.toLowerCase())
          );
      });
  } else {
    
    const startIndex = this.first;
    const endIndex = startIndex + this.rows;
    this.pagedEmployeeList = this.employeeList.slice(startIndex, endIndex);
  }
  }
  
  onSortbyUsername(columnName: string) {
    if (this.sortbyusername === columnName) {
      // If the same column is clicked again, reverse the sorting order
      this.sortOrder = -this.sortOrder;
    } else {
      // If a different column is clicked, set it as the new sorting column
      this.sortbyusername = columnName;
      // this.sortField2 = columnName
      this.sortOrder = 1; // Default to ascending order
    }
    
    // Now, sort the pagedEmployeeList based on the selected column and order
    this.updatePagedEmployeeList();
  }

  onSortbyFirstname(columnName: string) {
    if (this.sortbyfirstname === columnName) {
      this.sortOrder = -this.sortOrder;
    } else {
      this.sortbyfirstname = columnName;
      this.sortOrder = 1;
    }
    this.updatePagedEmployeeList();
  }

  Onsortbylastname(columnName: string) {
    if (this.sortbylastname === columnName) {
      this.sortOrder = -this.sortOrder;
    } else {
      this.sortbylastname = columnName;
      this.sortOrder = 1;
    }
    this.updatePagedEmployeeList();
  }

  onSortsortbyemail(columnName: string) {
    if (this.sortbyemail === columnName) {
      this.sortOrder = -this.sortOrder;
    } else {
      this.sortbyemail = columnName;
      this.sortOrder = 1;
    }
    this.updatePagedEmployeeList();
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
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete data?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Deleted Succefully!' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Failed Deleted Employee!' });
      }
  });
  }

  isListView(){
    localStorage.setItem('forNew',JSON.stringify(this.forNew));
    this.route.navigateByUrl('/add-employee');
  }

}
