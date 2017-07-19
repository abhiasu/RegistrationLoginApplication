import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rootRouterConfig } from './app.routes'
import { Router, RouterModule } from '@angular/router';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/shared/login.service';
import { HomeComponent } from './home/home.component';
import { RegistrationService } from './registration/shared/registration.service';
import { HomeService } from './home/shared/home.service';

import { DatePickerModule } from 'ng2-datepicker';

import { HttpInterceptor } from '../shared/httpInterceptor';
export function httpFactory(xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  router: Router) {
  return new HttpInterceptor(xhrBackend,
    requestOptions,
    router);
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    DatePickerModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [RegistrationService,
    LoginService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
