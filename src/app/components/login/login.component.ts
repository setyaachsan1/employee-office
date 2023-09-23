import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  eyeIcon = faEye;
  eyeSlashIcon= faEyeSlash;
  signupUsers: any[] = [];
  signupObj:any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    EmailId: '',
    Password: ''
  };
  visible:boolean = true;
  changetype:boolean =true;
  icon:string='eyeIcon';

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
    this.icon='eyeSlashIcon';
  }

  constructor(private accService: AccountService, private route: Router) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }

  }
  onSignUp() {
   this.signupUsers.push(this.signupObj);
   localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
   this.signupObj = {
    userName: '',
    email: '',
    password: ''
  };
  }
  onLogin() {
  const localData = localStorage.getItem('signUpUsers');

  if(localData == null || this.loginObj.EmailId != this.signupUsers[0].userName){
    alert("Please Sign Up")
  } else {
    this.route.navigateByUrl('/home');
    this.accService.onLogin(this.loginObj).subscribe((res: any) => {
    localStorage.setItem('token',res.token);
    this.route.navigateByUrl('/home');
  })
  }
  

}
}
