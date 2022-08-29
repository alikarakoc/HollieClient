import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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


  showPassword: boolean = false;
  model: any = {};


  constructor(
    private authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {

      this.router.navigate(['home']);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
      const tokenT = localStorage.getItem("token");
      if (tokenT) {
        this.router.navigate(['home'], { relativeTo: this.activatedRoute });
      }
    },
      error => {
        console.log(error);
        alert("Hatalı giriş");
      })


  }
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
