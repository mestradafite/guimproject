import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  constructor(private authService: AuthService, private router: Router) { }

  private user: UserInterface = {
    id: "",
    name: "",
    email: "",
    password: "",
    createdAt: "",
    updatedAt: "",
    userToken: ""    
  }

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.router.navigateByUrl('/user-profile');
    } 
  }

  onLogin(){
    if(this.user.email === "" && this.user.password === "" ){
      // User o contraseña vacios
      console.log("Undefined");
      
    }else{
      return this.authService.loginuser(this.user.email, this.user.password)
      .subscribe(data => {
        console.log("Login Ok! ");
        this.user = data;
        this.authService.setUser(this.user);
        this.router.navigateByUrl('/user-profile');
      },
      error => {
        console.log(error)
      });
    }
    
  }

}
