import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Registration } from '../registration/shared/registration.model';
import { RegistrationService } from '../registration/shared/registration.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registrationModel: Registration = new Registration();
  constructor(public registrationService: RegistrationService,
    private router: Router) { }

  ngOnInit() {


  }

  public Registration() {
    this.registrationService.registration(this.registrationModel).then((result) => {
      if (result.status === 400) {
        let message = result.json().message;
        alert(message);
      } else {
        let link = ['/home'];
        this.router.navigate(link);
      }
    })
  }

  public login() {
    let link = ['/login'];
    this.router.navigate(link);

  }
}
