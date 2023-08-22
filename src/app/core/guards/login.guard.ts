import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  activeCompany!:boolean;
  text!: string;
  constructor(private router: Router,
              private _authService: AuthService,
) { }

  canActivate(_route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.user != null) {
      this.router.navigate(['/']);
      return false; 
    }

    // Navigate to the login page with extras
    
    return true;
  }



  get user(): any {
    const user = this._authService.currentUserValue;
    if (user) {
      return user;
    }
    return null;
  }
}
