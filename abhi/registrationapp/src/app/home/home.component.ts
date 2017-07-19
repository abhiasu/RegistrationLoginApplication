import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Registration } from '../registration/shared/registration.model';
import { HomeService } from '../home/shared/home.service';
import { User } from '../home/shared/user.model';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [DatePipe]
})
export class HomeComponent implements OnInit {
    private date: string = '';
    private userEmail = '';
    private userModel: User = new User();
    constructor(private router: Router,
        private homeService: HomeService,
        private datePipe: DatePipe) {

    }
    ngOnInit() {
        let userInfo: any = JSON.parse(localStorage.getItem('userInfo'));
        this.userModel.dob = userInfo.dob; // yyyy-mm-dd
        this.userModel.email = userInfo.email;
        this.userModel.dob = new DatePipe('en-US').transform(this.userModel.dob, 'yyyy-MM-dd');

    }
    public updateUserInfo() {
       localStorage.setItem('userInfo', JSON.stringify(this.userModel))
        this.homeService.updateUserInfo(this.userModel).then((result) => {
            if (result.status === 400) {
                let message = result.json().message;
                alert(message);
            } else {
                alert('Your DOB is updated');
            }
        })

    }

     public userLogout() {
       localStorage.setItem('userInfo', JSON.stringify(this.userModel))
        this.homeService.userLogout(this.userModel.email).then((result) => {
            if (result.status != 200) {
                let message = result.json().message;
                alert(message);
            } else {
               // alert('Logout Sucessfull');
               localStorage.removeItem('userInfo');
                let link = ['/login'];
                this.router.navigate(link);
            }
        })

    }


}
