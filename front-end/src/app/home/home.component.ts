import { Component } from '@angular/core';
import { CoverComponent } from './cover/cover.component';
import { NavbarModule } from '../navbar/navbar.module';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverComponent,NavbarModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
