import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}


@Component({
  selector: 'app-brand-signup',
  templateUrl: './brand-signup.component.html',
  styleUrls: ['./brand-signup.component.css']
})
export class BrandSignupComponent implements OnInit {
  @Input()
  public alerts: Array<IAlert> = [];
  private alertVisible: boolean;
  private registerSucceed: boolean;
  private policyVisible: boolean;
  private policy: boolean = false;

  private user: UserInterface = {
    id: "",
    name: "",
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

  constructor(private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) {
    this.alerts.push({
      id: 1,
      type: 'success',
      strong: 'Correcto!',
      message: 'Marca registrada, redirigiendo a la pantalla de login...',
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
      message: 'Para continuar con el registro debe estar de acuerdo con la Política de Privacidad.',
      icon: 'ni ni-support-16'
  }, {
      id: 4,
      type: 'danger',
      strong: 'Error!',
      message: 'Algún dato no tiene el formato correcto, por favor, vuelvelo a intentar.',
      icon: 'ni ni-support-16'
  });
   }

  ngOnInit(): void {}

  register(){
    var self = this;
    if(this.policy){
      this.policyVisible = false;
      if(this.user.name === "" || this.user.email === "" || this.user.password === "" ){
        // User o contraseña vacios
        this.alertVisible = true;        
      }else{
        this.spinner.show();
        this.alertVisible = false;
        
        return this.authService.registerUser(this.user.name, this.user.email, this.user.password, "", "0", false, true)
        .subscribe(data => {
          console.log("Register Ok! ");
          this.registerSucceed = true;
          this.spinner.hide();
          setTimeout(function () {
            self.router.navigateByUrl('/login');
          }, 3000);
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.alertVisible = true;
        });
      }
    }else{
      this.policyVisible = true;
    }
  }
}

