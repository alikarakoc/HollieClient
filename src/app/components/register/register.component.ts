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
  miniLetters : boolean =false;
  hugeLetters : boolean =false;
  digits: boolean=false;
  long : number = 0;
  successful: boolean = false;
  littleLetters: string = "abcdefghijklmnopqrstuvwxyz";
  bigLetters: string = "ABCDEFGHIKLMNOPQRSTVXYZ";
  numbers: string="0987654321";


  constructor(
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  filterPassword(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    let fpassword =filterValue.charAt(filterValue.length-1);
    if(fpassword!=""){
        if(this.long >filterValue.length){
          this.miniLetters=false;
          this.hugeLetters=false;
          this.digits=false;

          for(let i=0; i<filterValue.length ; i++){

            if(this.littleLetters.includes(filterValue.charAt(i)))    {
              this.miniLetters=true; 
            }
            else if(this.bigLetters.includes(filterValue.charAt(i)))    {
              this.hugeLetters = true;
            }
            else if(this.numbers.includes(filterValue.charAt(i)))    {
              this.digits=true; 
            }
          }
          this.long = filterValue.length;

          return;

        }
      if(this.littleLetters.includes(fpassword))    {
        this.miniLetters=true;
      }
      else if(this.bigLetters.includes(fpassword))    {
        this.hugeLetters = true;
      }
      else if(this.numbers.includes(fpassword))    {
        this.digits=true;
      }
  
      this.long = filterValue.length;
    }
  }

  register() {

    if(!this.miniLetters){
      alert("Şifrenizde küçük harf bulunmamaktadır.")
      return;
    }
    if(!this.hugeLetters){
      alert("Şifrenizde büyük harf bulunmamaktadır.")
      return;
    }
    if(!this.digits){
      alert("Şifrenizde sayı bulunmamaktadır.")
      return;
    }
    
    if(this.model.password.length<=8){
      alert("Şifreniz yeterli karaktere sahip değildir.")
      return;
    }
  
    this.authService.register(this.model).subscribe(() => {
      if (localStorage.getItem("isSuccessful") === "true") {
        alert("Giriş başarılı!")
      }
      else if (localStorage.getItem("isSuccessful") === "false") {
        alert("Giriş başarısız!")
      }
    }, error => {
      console.log(error);
      alert("Giriş başarısız!")
    });

  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  successfule() {
    return this.successful;
  }




}
