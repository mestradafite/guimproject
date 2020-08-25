import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';

@Component({
  selector: 'app-brand-profile',
  templateUrl: './brand-profile.component.html',
  styleUrls: ['./brand-profile.component.css']
})
export class BrandProfileComponent implements OnInit {
  private username = "";
  private user: UserInterface = {
    id: "",
    username: "",
    email: "",
    password: "",
    createdAt: "",
    updatedAt: "",
    userToken: ""    
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.formatUserName();
  }

  formatUserName(){
    var splitted = this.user.username.split(" "); 
    console.log(splitted);

    for (let i = 0; i < splitted.length; i++) {
        this.username += splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1).toLowerCase() + " ";
    }
    
}

}
