import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {
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

    socialNetworks: string[] = ["Instagram", "Youtube", "Twitter"];
    sortOrdersIcons: string[] = ["fa fa-instagram", "fa fa-youtube", "fa fa-twitter"];
    selectedSortOrder: string = this.socialNetworks[0];
    selectedSortOrderIcon: string = this.sortOrdersIcons[0];
    currDiv: string = this.socialNetworks[0];

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
    } 

    ChangeSortOrder(selectedSocialNetwork: string) { 
        this.selectedSortOrder = selectedSocialNetwork;
        this.selectedSortOrderIcon = "fa fa-" + selectedSocialNetwork.toLowerCase();
        this.currDiv = selectedSocialNetwork;
        
    }

}
