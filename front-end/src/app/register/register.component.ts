import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = '';
  password: string = '';

  constructor(private _auth: AuthService, private router: Router) { }

  register() {
    this._auth.register(this.email, this.password).subscribe(
      res => {
        console.log("Registration successful");
        this.router.navigate(['/login']);
      },
      err => {
        console.error("Registration error", err);
      }
    );
  }

}
