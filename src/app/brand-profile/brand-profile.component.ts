import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';

@Component({
  selector: 'app-brand-profile',
  templateUrl: './brand-profile.component.html',
  styleUrls: ['./brand-profile.component.css']
})
export class BrandProfileComponent implements OnInit {
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
  }

}
