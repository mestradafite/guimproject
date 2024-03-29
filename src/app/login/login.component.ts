import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { UserSettingsInterface } from '../models/user-settings-interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

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
  private alertValidVisible: boolean;
  private loginSucceed: boolean;

  focus;
  focus1;
  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {
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
        type: 'danger',
        strong: 'Error!',
        message: 'Usuario no validado, vuelvo a intentarlo en unos instantes o ponte en contacto con nosotros',
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
    username: "",
    email: "",
    password: "",
    sex: "",
    influencer: false,
    brand: false,
    credits: "",
    createdAt: "",
    updatedAt: "",
    userToken: ""    
  }

  private userSettings: UserSettingsInterface = {
    userid: "",
    boxlimit: "",
    price: "",
    locale: "",
    categories: "",
    tags: "",
    account: "",
    vacationMode: false   
  }

  ngOnInit() {
    this.alertVisible = false;
    this.loginSucceed = false;
    this.alertValidVisible = false;
    if (this.authService.getCurrentUser()) {
      if(this.authService.getCurrentUser().influencer) this.router.navigateByUrl('/user-profile');
      else if(this.authService.getCurrentUser().brand) this.router.navigateByUrl('/brand-profile');
    } 
  }

  onLogin(){
    if(this.user.email === "" && this.user.password === "" ){
      // User o contraseña vacios
      console.log("Undefined");
      this.alertVisible = true;
      
    }else{
      this.spinner.show();
      return this.authService.loginuser(this.user.email, this.user.password)
      .subscribe(data => {
        console.log("Login Ok! ");
        console.log(data);
        if(data == "User not validated"){
          this.loginSucceed = false;
          this.alertValidVisible = true;
          this.spinner.hide();
        }else{
          this.loginSucceed = true;
          this.user = data;
          this.authService.setUser(this.user);
          this.checkUserInfo();

          this.authService.getUserSettings(this.user.id)
          .subscribe(data => {
              this.spinner.hide();
              this.userSettings = data[0];
              this.authService.setUserSettings(this.userSettings);
            },
            error => {
              this.spinner.hide();
              console.log(error);
              this.alertVisible = true;
            });
        }
        
      },
      error => {
        this.spinner.hide();
        console.log(error);
        this.alertVisible = true;
      });
    }
    
  }

  checkUserInfo(){
    if(this.user.influencer) this.router.navigateByUrl('/user-profile');
    else if(this.user.brand) this.router.navigateByUrl('/brand-profile');
  }

  isAlertVisible(){
    return this.alertVisible;
  }

}
