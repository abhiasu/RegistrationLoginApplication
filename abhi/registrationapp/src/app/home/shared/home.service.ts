
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'Rxjs/Rx';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../../config.component';
import { Registration } from '../../registration/shared/registration.model';


@Injectable()
export class HomeService {

    constructor(private http: Http) {
    }

    public updateUserInfo(userInfo): Promise<any> {
        return this.http.put(ApiUrl.baseUrl + 'api_routes/api/v1/profileupdate/', userInfo)
            .toPromise()
            .then(res => res)
            .catch(err => err);
    }

     public userLogout(userInfo): Promise<any> {
          
        return this.http.post(ApiUrl.baseUrl + 'api/v1/auth/logout/', userInfo)
            .toPromise()
            .then(res => res)
            .catch(err => err);
    }






}
