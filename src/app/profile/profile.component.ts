import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { AgeFromDateString, AgeFromDate } from 'age-calculator'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {
    private userAge = "";
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
        this.formatUserName();
    } 

    getUserAge(){
        if(this.user.birthDay){
            this.birthday = this.user.birthDay;
            let ageFromString = new AgeFromDateString(this.birthday.year + "-" + this.birthday.month + "-" + this.birthday.day).age;
            this.userAge = String(ageFromString);
        }
    }

    formatUserName(){
        var splitted = this.user.username.split(" "); 

        for (let i = 0; i < splitted.length; i++) {
            this.username += splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1).toLowerCase() + " ";
        }
        
    }

    ChangeSortOrder(selectedSocialNetwork: string) { 
        this.selectedSortOrder = selectedSocialNetwork;
        this.selectedSortOrderIcon = "fa fa-" + selectedSocialNetwork.toLowerCase();
        this.currDiv = selectedSocialNetwork;
    }

}
