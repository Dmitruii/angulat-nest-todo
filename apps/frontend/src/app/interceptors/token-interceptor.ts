import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   
    const accessToken = localStorage.getItem('authToken')

    if (accessToken) {
      return next.handle(req.clone({
        withCredentials: true,
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      }))
    }

    return next.handle(req);
  }
}
