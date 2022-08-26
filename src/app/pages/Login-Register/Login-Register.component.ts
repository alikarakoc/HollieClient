import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';

@Component({
  selector: 'app-Login-Register',
  templateUrl: './Login-Register.component.html',
  styleUrls: ['./Login-Register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
