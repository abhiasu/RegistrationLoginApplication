
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'Rxjs/Rx';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../../config.component';
import { Login } from '../shared/login.model';


@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    public login(login: Login): Promise<any> {
        return this.http.post(ApiUrl.baseUrl + 'api/v1/auth/login/', login)
            .toPromise()
            .then(res => res)
            .catch(err => err);
    }


}
