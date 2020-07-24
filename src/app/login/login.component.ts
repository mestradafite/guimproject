import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { Router } from '@angular/router';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  private alertVisible: boolean;
  private loginSucceed: boolean;

  focus;
  focus1;
  constructor(private authService: AuthService, private router: Router) {
    this.alerts.push({
        id: 1,
        type: 'success',
        strong: 'Correcto!',
        message: 'Usuario conectado, redirigiendo...',
        icon: 'ni ni-like-2'
    }, {
        id: 2,
        strong: 'Info!',
        type: 'info',
        message: 'This is an info alert—check it out!',
        icon: 'ni ni-bell-55'
    }, {
        id: 3,
        type: 'warning',
        strong: 'Warning!',
        message: 'This is a warning alert—check it out!',
        icon: 'ni ni-bell-55'
    }, {
        id: 4,
        type: 'danger',
        strong: 'Error!',
        message: 'Usuario y/o contraseña incorrectos.',
        icon: 'ni ni-support-16'
    });
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
   }

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
    this.alertVisible = false;
    this.loginSucceed = false;
    if (this.authService.getCurrentUser()) {
      this.router.navigateByUrl('/user-profile');
    } 
  }

  onLogin(){
    if(this.user.email === "" && this.user.password === "" ){
      // User o contraseña vacios
      console.log("Undefined");
      this.alertVisible = true;
      
    }else{
      return this.authService.loginuser(this.user.email, this.user.password)
      .subscribe(data => {
        console.log("Login Ok! ");
        this.loginSucceed = true;
        this.user = data;
        this.authService.setUser(this.user);
        this.router.navigateByUrl('/user-profile');
      },
      error => {
        console.log(error);
        this.alertVisible = true;
      });
    }
    
  }

  isAlertVisible(){
    return this.alertVisible;
  }

}
