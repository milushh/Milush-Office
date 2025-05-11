import { Component } from '@angular/core';
import {  RouterLink,  RouterOutlet } from '@angular/router';
import { BannerComponent } from '../../Components/banner/banner.component';

@Component({
  selector: 'app-main-page',
  imports: [ RouterLink, RouterOutlet , BannerComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
