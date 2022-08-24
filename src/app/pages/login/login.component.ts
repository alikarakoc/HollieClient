import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  showPassword : boolean = false;
  model:any={};


  constructor(
    private authService:AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit():void {
    if(localStorage.getItem("token")){

    this.router.navigate(['home']);
    }
  }

  login(){
    console.log(this.model);

    this.authService.login(this.model).subscribe((next)=> {
      const tokenT = localStorage.getItem("token");
     if(tokenT){
      this.router.navigate(['home'],{relativeTo:this.activatedRoute});
     }
   },
   error=>{
    console.log(error);

    alert("login hatalı");
   })


  }
  loggedIn(){
    const token=localStorage.getItem("token");
    return token?true:false;


     }

     showHidePassword() {
      this.showPassword = !this.showPassword;
     }
}
