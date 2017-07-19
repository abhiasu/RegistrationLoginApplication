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
    if (this.registrationModel.email == '') {
      alert("Please enter email");
      return;
    }
    if (this.registrationModel.password == '') {
      alert("Please enter password");
      return;
    }
    if (this.registrationModel.confirmPassword == '') {
      alert("Please enter confirm password");
      return;
    }
    if(this.registrationModel.password != this.registrationModel.confirmPassword){
      alert("Password do not match");
      return;
    }
    
    this.registrationService.registration(this.registrationModel).then((result) => {
      if (result.status != 200) {
        let message = result.json().message;
        alert(message.message);
      } else {
         localStorage.setItem('userInfo', JSON.stringify(result.json()))
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
