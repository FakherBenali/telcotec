import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  permissions: string[] = [];
  isadmin : boolean = false;
  constructor() { }

  ngOnInit(): void {
    // Retrieve permissions from local storage
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      this.permissions = storedPermissions.split(",");
      console.log(this.permissions)
    }

    const isadmin = localStorage.getItem('isadmin');
    if (isadmin) {
      this.isadmin = isadmin == "true";
    }
    
  }
}
