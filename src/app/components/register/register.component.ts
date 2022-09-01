import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthGuard } from 'src/app/guards/common/auth.guard';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  showPassword: boolean = false;
  model: any = {

  }
  successful: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {

  }

  register() {

    this.authService.register(this.model).subscribe(() => {
      if (localStorage.getItem("isSuccessful") === "true") {
        alert("Registration Successful!")
      }
      else if (localStorage.getItem("isSuccessful") === "false") {
        alert("Registration Failed!")
      }
    }, error => {
      console.log(error);
      alert("Registration Failed!")
    });

  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  successfule() {
    return this.successful;
  }




}
