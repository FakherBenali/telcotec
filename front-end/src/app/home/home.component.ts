import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path as needed
import { CoverComponent } from './cover/cover.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ChartComponent } from '../chart/chart.component';
import { RevenuesComponent } from './../revenues/revenues.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverComponent, NavbarModule, ChartComponent, RevenuesComponent, MatExpansionModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  username: string = '';
  role: string = '';
  email: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (user: any) => {
        console.log(user);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
