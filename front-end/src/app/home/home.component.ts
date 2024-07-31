import { Component,signal } from '@angular/core';
import { CoverComponent } from './cover/cover.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ChartComponent } from '../chart/chart.component';
import {RevenuesComponent} from './../revenues/revenues.component'
import {MatExpansionModule} from '@angular/material/expansion';
import {ChangeDetectionStrategy} from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverComponent,NavbarModule,ChartComponent, RevenuesComponent,MatExpansionModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent {
  readonly panelOpenState = signal(false);

}
