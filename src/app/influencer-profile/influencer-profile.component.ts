import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { AgeFromDateString, AgeFromDate } from 'age-calculator'

@Component({
  selector: 'app-influencer-profile',
  templateUrl: './influencer-profile.component.html',
  styleUrls: ['./influencer-profile.component.css']
})

export class InfluencerProfileComponent implements OnInit {
    private userAge = "";
    private user: UserInterface = {
        id: "",
        username: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
        userToken: ""    
    }

    private birthday: any = {
        year: "",
        month: "",
        day: ""
    }

    constructor(private authService: AuthService) { }

    socialNetworks: string[] = ["Instagram", "Youtube", "Twitter"];
    sortOrdersIcons: string[] = ["fa fa-instagram", "fa fa-youtube", "fa fa-twitter"];
    selectedSortOrder: string = this.socialNetworks[0];
    selectedSortOrderIcon: string = this.sortOrdersIcons[0];
    currDiv: string = this.socialNetworks[0];

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        console.log(this.user);
        
        this.getUserAge();
    } 

    getUserAge(){
        if(this.user.birthDay){
            this.birthday = this.user.birthDay;
            let ageFromString = new AgeFromDateString(this.birthday.year + "-" + this.birthday.month + "-" + this.birthday.day).age;
            this.userAge = String(ageFromString);
        }
    }

    ChangeSortOrder(selectedSocialNetwork: string) { 
        this.selectedSortOrder = selectedSocialNetwork;
        this.selectedSortOrderIcon = "fa fa-" + selectedSocialNetwork.toLowerCase();
        this.currDiv = selectedSocialNetwork;
        
    }

}

