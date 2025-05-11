import { Component } from '@angular/core';
import { Router, RouterLink,  RouterOutlet } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [RouterLink,  RouterOutlet,HeaderComponent, FooterComponent ,MainPageComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'milush-office';
}
