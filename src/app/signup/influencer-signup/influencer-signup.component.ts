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
  selector: 'app-influencer-signup',
  templateUrl: './influencer-signup.component.html',
  styleUrls: ['./influencer-signup.component.css']
})
export class InfluencerSignupComponent implements OnInit {
  @Input()
  public alerts: Array<IAlert> = [];
  private alertVisible: boolean;
  private registerSucceed: boolean;
  private policyVisible: boolean;
  private sexes: string[] = ["Hombre", "Mujer", "Otro"];
  private selectedSex: string = "Sexo";
  private surname: string = "";
  private policy: boolean = false;

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

  constructor(private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) {
    this.alerts.push({
      id: 1,
      type: 'success',
      strong: 'Correcto!',
      message: 'Influencer registrad@, redirigiendo a la pantalla de login...',
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
      if(this.user.username === "" || this.surname === "" || this.user.email === "" || this.user.password === "" || this.selectedSex === "Sexo" ){
        // User o contraseña vacios
        this.alertVisible = true;        
      }else{
        this.spinner.show();
        this.alertVisible = false;
        this.user.username = this.user.username + " " + this.surname; 
        
        return this.authService.registerUser(this.user.username, this.user.email, this.user.password, this.selectedSex, "0", true, false)
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

  changeSex(sex: string){
    this.selectedSex = sex;
  }
}
