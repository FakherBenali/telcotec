import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:   [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  author = {
    email: '',
    password: '',
  }

  constructor(private _auth: AuthService , private router : Router) {  }
  token :any;
  loginError:boolean = false;
  login(){

    this._auth.login(this.author).subscribe(
      (res: any)=>{
        console.log(res.status)
        if (res.status == 400) {
          this.loginError = true;
        }else{
          this.token = res ;
          console.log(res);
          
          localStorage.setItem('token' , this.token.mytoken)
          localStorage.setItem('permissions' , this.token.permissions)
          localStorage.setItem('isadmin' , this.token.isadmin)
          this.router.navigate(['/home']);
        }
      }
      ,
      (err) =>{
        this.loginError = true;
        console.log(err);
        
      }
    )
  }

  goToRegister( ){
    this.router.navigate(['/register']);
  }
}
