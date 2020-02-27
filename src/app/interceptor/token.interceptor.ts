import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const req = request.clone({
        setHeaders: {Authorization: 'Bearer ' + accessToken}
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
