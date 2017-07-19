import { EventEmitter } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Cookie } from 'ng2-cookies/ng2-cookies';
export class HttpInterceptor extends Http {

  authorization: any;
  requested: EventEmitter<string>;
  completed: EventEmitter<string>;
  error: EventEmitter<string>;

  constructor(backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private router: Router,
  ) {
    super(backend, defaultOptions);
    this.requested = new EventEmitter<string>();
    this.completed = new EventEmitter<string>();
    this.error = new EventEmitter<string>();
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // this.requested.emit('start');

    options = this.addHeaders(options);

    return this.intercept(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    // this.requested.emit('start');
    // options = this.addHeaders(options);
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    // this.requested.emit('start');
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // this.requested.emit('start');

    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {

    let isHeaderFound = true;
    if (!options) {
      isHeaderFound = false;
    }
    options = this.addHeaders(options);
    if (!isHeaderFound) {
      // options.headers.append('Content-Type', 'application/json');
    }
    return options;
  }

  addHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }
    // this.authorization = this.localStorageService.get('authorization');
    if (Cookie.get('userToken') && Cookie.get('userToken') !== 'undefined') {
      //  if (this.authorization) {
      // let sessionId = Cookie.get('sessionId');
      let userToken = Cookie.get('userToken');
      // options.headers.append('sessionId', sessionId);
      options.headers.append('userToken', 'Bearer ' + userToken);
      console.log('auth is ');
      console.log(options);
      //  }
    }
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    //  this.getCokee();
    // alert('hi');
    return observable.catch((err, source) => {
      // this.error.emit(err);
      if (err.status === 401) {                   // UnOthorised Access
        this.authorization = Cookie.get('userToken');
        if (this.authorization) {
          Cookie.delete('userId');
          Cookie.delete('userToken');
        }
         this.router.navigate(['/login']);
        return Observable.empty();

      } else if (err.status === 403) {
        console.log('you can not access api');
        this.router.navigate(['']);
        return Observable.throw(err);
      } else if (err.status === 0) {                // Api Connection Refused
        console.log('ERR_CONNECTION_REFUSED, Api is down');
        return Observable.throw(err);
      } else {
        return Observable.throw(err);
      }
    });
  }

}
