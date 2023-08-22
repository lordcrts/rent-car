import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router,
              private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser =  null
    if(this.authService.currentUserValue){
      currentUser = this.authService.currentUserValue
      if (currentUser && currentUser.access_token) {
        if (request.body && typeof request.body === 'object') {
          // request = request.clone({
          //   headers: request.headers.set('Content-Type', 'multipart/form-data')});
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.access_token}`
              },
            });
        }else{
          request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')});
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.access_token}`
              },
            });
        }
          



      }
    }
    return next.handle(request);
  }
}
