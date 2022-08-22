import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  hide: boolean = false;
  isAuth: boolean = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  isAuthenticated(){
    if(this.isAuth){
      return true;
    }
    else{
       return false;
    }
  }


  onLogin() {
     var user : Login = this.loginForm.value;

     debugger;
     this.loginService
     .loginUser(user)
     .subscribe((res) => { 
      console.log(res);
      if(res.isSuccessful === true){
        this.isAuth = true;
        this.router.navigate(['/home'],{relativeTo:this.activatedRoute});
      }
      else{
        alert("Wrong username or password")
      }
     });
     console.log(this.loginForm.value);
   
  }

}
