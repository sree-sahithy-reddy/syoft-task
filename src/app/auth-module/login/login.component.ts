import { Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:boolean = false;
  username:any;
  password:any;
  baseUrl:any;
  userDetails:any;
  unauthorized:boolean = false;

  constructor(private http: HttpClient,private router: Router) {
    if (window.location.hostname === 'localhost') {
        this.baseUrl = window.location.protocol + '//' + window.location.hostname + ':3000';
  
      } else {
        this.baseUrl = window.location.origin + '/'
  
      }
   }

  ngOnInit(): void {
   
  }

  goToLogin() {
    this.loginForm = true;
  }

  login() {
    console.log(this.password,this.username);

    this.http.post(this.baseUrl + '/v1/user_login',{
        username:this.username,
        password:this.password
    }).subscribe({next: (res) => {
        console.log(res);
        this.userDetails = res;
        if(this.userDetails.role != 'staff'){
        localStorage.setItem('user',this.userDetails.user);
        localStorage.setItem('token',this.userDetails.token);
        sessionStorage.setItem('active', 'true');
        sessionStorage.setItem('role',this.userDetails.role);

        this.router.navigate(['/main']);
        }else{
          this.unauthorized = true;
        }
    },error : (err) => {
        console.log(err);
    }})
  }
  
}
