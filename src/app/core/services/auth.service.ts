import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public userSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient,
        private _router: Router ) {
        if(localStorage.getItem('userBody')){
            this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userBody')!));
        }else{
            this.userSubject = new BehaviorSubject<any>(null);
        }
        this.currentUser = this.userSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.userSubject.value;
    }

    public login(login:Login): Observable<HttpResponse<any>> {
        let body = {
            username:login.username,
            password:login.password,
            client_id:environment.client_id_passowrd,
            grant_type:environment.grant_type_password
        }
        return this.http.post(`${environment.url}api/token/`, body,
            {   //Se añaden los headers en la peticion, para que no de error de cors
                observe: 'response'
            }).pipe(map(user => {
                localStorage.setItem('userBody',JSON.stringify(user['body']))
                this.userSubject = new BehaviorSubject<any>(user['body']);
                this._router.navigateByUrl('/')
                return user;
            }));
    }

    public create(login:Login): Observable<any> {
        let body = {
            username:login.username,
            password:login.password,
            first_name:login.first_name,
            email:login.email
        }
        return this.http.post(`${environment.url}api/signup/`, body)
    }

    public loginGoogle(token:string): Observable<HttpResponse<any>> {
        let body = {
            client_id:environment.client_google,
            grant_type:environment.grant_type_convert,
            backend:'google-oauth2',
            token:token,
            client_secret:environment.client_secret
        }
        return this.http.post(`${environment.url}api/convert-token/`, body,
            {   //Se añaden los headers en la peticion, para que no de error de cors
                observe: 'response'
            }).pipe(map(user => {
                localStorage.setItem('userBody',JSON.stringify(user['body']))
                this.userSubject = new BehaviorSubject<any>(user['body']);
                this._router.navigateByUrl('/')
                return user;
            }));
    }

    logout(){
        localStorage.clear();
        this.userSubject.next(null)
        location.reload()
    }
}
