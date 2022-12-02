import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/components/auth/login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router,
              private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser =  null
    if(this.authService.getAuthToken()){
      currentUser = this.authService.getAuthToken()


      if (currentUser && currentUser.stsTokenManager.accessToken) {
        if (!request.headers.has('Content-Type')){
          request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')});
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`
              },
            });
        }



      }
    }
    return next.handle(request);
  }
}
