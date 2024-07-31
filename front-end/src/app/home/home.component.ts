import { Component } from '@angular/core';
import { CoverComponent } from './cover/cover.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ChartComponent } from '../chart/chart.component';
import {RevenuesComponent} from './../revenues/revenues.component'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverComponent,NavbarModule,ChartComponent, RevenuesComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
