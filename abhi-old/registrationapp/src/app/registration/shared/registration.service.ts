
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
export class RegistrationService {

  constructor(private http: Http) {
  }

  public registration(registration: Registration): Promise<any> {
    return this.http.post(ApiUrl.baseUrl + 'api/v1/auth/register/', registration)
      .toPromise()
      .then(res => res)
      .catch(err => err);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
