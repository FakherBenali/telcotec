import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { NavbarModule } from '../navbar/navbar.module';
@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [NavbarModule,CommonModule,FormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})




export class AccountsComponent {

  email: string ="";
  password: string = "";
  selectedPermissions: { [key: string]: boolean } = {};
  permissions: any = [
    {"id" : "66693007e9b2b5672be9fcbf" , "name": "TASKS"} , 
    {"id" : "66693050e9b2b5672be9fcc1" , "name": "USERS"} , 
    {"id" : "66693082e9b2b5672be9fcc3" , "name": "FINANCE"} , 
    ];
isadmin: any;

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {

  }

  onSubmit(): void {
    const selectedPermissionIds = Object.keys(this.selectedPermissions)
                                      .filter(key => this.selectedPermissions[key]);

    const agent = {
      email: this.email,
      password: this.password,
      permissions: selectedPermissionIds
    };

    this.agentService.createAgent(agent).subscribe(
      agent => {
        console.log('Agent created successfully:', agent);
        // Optionally reset the form after successful submission
        this.resetForm();
      },
      error => {
        console.error('Error creating agent:', error);
      }
    );
  }

  resetForm(): void {
    this.email = '';
    this.password = '';
    this.selectedPermissions = {};
  }
}
