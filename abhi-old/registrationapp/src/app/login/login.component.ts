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
    this.loginService.login(this.loginModel).then((result) => {
      if (result.status === 400) {
        let message = result.json().message;
        alert(message);
      } else {
        let link = ['/home'];
        this.router.navigate(link);
      }
    })
  }
}
