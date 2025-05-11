import { Routes } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { RegistrationComponent } from './Pages/registration/registration.component';
export const routes: Routes = [
    {path: "", component: MainPageComponent },
    {path: "reg", component: RegistrationComponent },
];
