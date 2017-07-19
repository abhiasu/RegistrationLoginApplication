import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '../login/shared/login.service';
import { Login } from '../login/shared/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginModel: Login = new Login();
  constructor(private router: Router,
    public loginService: LoginService) { }

  ngOnInit() {
  }

  register() {
    let link = ['/register'];
    this.router.navigate(link);
  }

  login() {
    if (this.loginModel.email == '') {
      alert("Please enter email");
      return;
    }
    if (this.loginModel.password == '') {
      alert("Please enter password");
      return;
    }
    this.loginService.login(this.loginModel).then((result) => {
      if (result.status != 200) {
        let message = result.json().message;
        alert(message);
      } else {
        let obj: any = {
          email: result.json().email,
          dob: result.json().dob
        }

        localStorage.setItem('userInfo', JSON.stringify(obj)) // yaha email add krni hai
        let link = ['/home'];
        this.router.navigate(link);
      }
    })
  }
}
