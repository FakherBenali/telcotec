import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { NavbarModule } from '../navbar/navbar.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [NavbarModule, CommonModule, FormsModule, MatTabsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  username: string = "";
  password: string = "";
  selectedPermissions: { [key: string]: boolean } = {};
  permissions: any = [
    { "id": "66693007e9b2b5672be9fcbf", "name": "TASKS" },
    { "id": "66693050e9b2b5672be9fcc1", "name": "USERS" },
    { "id": "66693082e9b2b5672be9fcc3", "name": "FINANCE" },
  ];
  currentTabIndex: number = 0;

  private emailDomains: { [key: string]: string } = {
    '0': '@telcotec.agent',
    '1': '@telcotec.superuser',
    '2': '@telcotec.partner'
  };

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {}

  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index;
  }

  get domain(): string {
    return this.emailDomains[this.currentTabIndex.toString()];
  }

  onSubmit(): void {
    const email = `${this.username}${this.domain}`;
    const selectedPermissionIds = Object.keys(this.selectedPermissions)
                                      .filter(key => this.selectedPermissions[key]);

    const agent = {
      email: email,
      password: this.password,
      permissions: selectedPermissionIds
    };

    this.agentService.createAgent(agent).subscribe(
      agent => {
        console.log('Agent created successfully:', agent);
        this.resetForm();
      },
      error => {
        console.error('Error creating agent:', error);
      }
    );
  }

  resetForm(): void {
    this.username = '';
    this.password = '';
    this.selectedPermissions = {};
  }
}
