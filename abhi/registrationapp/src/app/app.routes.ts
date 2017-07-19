import { Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register' , component: RegistrationComponent },
  { path: 'register' , component: RegistrationComponent },
  { path: 'home' , component: HomeComponent },
  { path: 'login' , component: LoginComponent },
 
];