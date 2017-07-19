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
    HttpModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [RegistrationService,
    LoginService,
    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend,
        requestOptions: RequestOptions,
        router: Router
      ) => new HttpInterceptor(xhrBackend,
        requestOptions,
        router),
      deps: [XHRBackend, RequestOptions, Router],
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
