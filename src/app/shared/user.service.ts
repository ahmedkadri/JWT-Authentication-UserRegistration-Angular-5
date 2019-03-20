import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURL = 'http://localhost:5000/api';

  formModel = this.fb.group({
    UserName :['', Validators.required],
    Email :['', Validators.email],
    FullName :[''],
    Passwords : this.fb.group({
      Password :['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword :['', Validators.required]
    },{ validator : this.comparePasswords })

  });

  comparePasswords(fb : FormGroup){
    let ConfirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismach
    //ConfirmPswrdCtrl.errors={passwordMismach:true}
    if(ConfirmPswrdCtrl.errors == null || 'passwordMismach' in ConfirmPswrdCtrl.errors )
    {
      if( fb.get('Password').value != ConfirmPswrdCtrl.value )
        ConfirmPswrdCtrl.setErrors({passwordMismach: true});
        else
        ConfirmPswrdCtrl.setErrors(null);
    }
  }

  register()
  {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURL+'/ApplicationUser/Register', body);
  }

  login(formData)
  {
    return this.http.post(this.BaseURL+'/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    return this.http.get(this.BaseURL+'/UserProfile');
  }
}
