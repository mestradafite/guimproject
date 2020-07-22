import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { UserInterface } from '../models/user-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  constructor(private authService: AuthService) { }

  private user: UserInterface = {
    email: '',
    password: ""    
  }

  ngOnInit() {
  }

  onLogin(){
    if(this.user.email === "" && this.user.password === "" ){
      console.log("Undefined");
      
    }else{
      return this.authService.loginuser(this.user.email, this.user.password)
      .subscribe(data => {
        console.log("Login Ok!");
        
      },
      error => console.log(error)
      );
    }
    
  }

}
