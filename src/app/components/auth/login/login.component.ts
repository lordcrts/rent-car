import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form!:FormGroup;
  onSubmit!:boolean;
  user!: SocialUser;
  loggedIn!: boolean;
  constructor(public authService:AuthService, public fb:FormBuilder, private googleService: SocialAuthService) {
    this.form = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.googleService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.googleService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(token => {
        this.authService.loginGoogle(token).subscribe(data => {
        
      })
      })
      
    });
  }

  get username(): AbstractControl {
    return this.form.get("username")!;
  }

  get password(): AbstractControl {
    return this.form.get("password")!;
  }

  submit(type?:string){
    this.onSubmit= true
    if(this.form.invalid){
      this.username.markAsTouched()
      this.password.markAsTouched()
      return
    }
    this.authService.login(this.form.value).subscribe(data => {
    },(error) => {
      this.form.setErrors({error_description:error.error.error_description})
    })
  }
}
