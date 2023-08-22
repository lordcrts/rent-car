import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form!:FormGroup;
  onSubmit!:boolean;
  constructor(public authService:AuthService, public fb:FormBuilder) {
    this.form = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
      first_name:['', Validators.required],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
   }

  ngOnInit(): void {
  } 

  get username(): AbstractControl {
    return this.form.get("username")!;
  }

  get password(): AbstractControl {
    return this.form.get("password")!;
  }

  get first_name(): AbstractControl {
    return this.form.get("first_name")!;
  }

  get email(): AbstractControl {
    return this.form.get("email")!;
  }

  submit(type?:string){
    this.onSubmit= true
    if(this.form.invalid){
      this.username.markAsTouched()
      this.password.markAsTouched()
      this.first_name.markAsTouched()
      this.email.markAsTouched()
      return
    }
    this.authService.create(this.form.value).subscribe(data => {
      if(data){
        this.authService.login(this.form.value).subscribe(login =>{},(error) => {
          this.form.setErrors(error.error)
        })
      }
    },(error) => {
      this.form.setErrors(error.error)
    })
  }

  objToArray(obj: any): any[] {
    const attri = obj !== null ? Object.keys(obj) : []
    if (obj !== null && obj[attri.join('')] && Array.isArray(obj[attri.join('')])) {
      return obj[attri.join('')];
  } else {
      return [];
  }
  }
}
