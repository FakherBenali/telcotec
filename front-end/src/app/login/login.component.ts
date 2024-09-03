import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  author = {
    email: '',
    password: '',
  };

  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.author).subscribe({
      next: (res: any) => {
        if (res && res.mytoken) {
          localStorage.setItem('token', res.mytoken);
          localStorage.setItem('permissions', res.permissions);
          localStorage.setItem('isadmin', res.isadmin.toString());
          this.router.navigate(['/home']);
        } else {
          this.loginError = true;
        }
      },
      error: (err) => {
        this.loginError = true;
        console.error('Login error', err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
