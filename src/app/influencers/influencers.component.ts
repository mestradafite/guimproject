import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserInterface } from '../models/user-interface';
import { AgeFromDateString } from 'age-calculator'


@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {

  private users: UserInterface[] = [];
  private usersAge: string[] = [];
  private birthday: any = {
    year: "",
    month: "",
    day: ""
}

  constructor(private spinner: NgxSpinnerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllInfluencers();
  }

  getAllInfluencers(){ 
    if(this.authService.getCurrentUser()){
      return this.authService.getInfluencers(this.authService.getCurrentUser().id)
      .subscribe(data => {
        console.log("Getting user products...");
        this.users = data;
        this.getUserAge();
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  getUserAge(){
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].birthDay){
        this.birthday = this.users[i].birthDay;
        let ageFromString = new AgeFromDateString(this.birthday.year + "-" + this.birthday.month + "-" + this.birthday.day).age;
        this.usersAge[i] = String(ageFromString);
      }
    }
}

}

