import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.component.html',
  styles: []
})
export class RegistraionComponent implements OnInit {

  constructor(public service : UserService, private toastr : ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit()
  {
    this.service.register().subscribe(
      (res:any) =>{
        if(res.succeeded)
        {
          this.service.formModel.reset();
          this.toastr.success('New User Created','Registration Successful.');
        }else{
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('UserName is already taken','Registration Failed.');
                //UserName is already taken
                break;
            
              default:
                this.toastr.error(element.description,'Registration Failed.');
               //Registration failed
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
