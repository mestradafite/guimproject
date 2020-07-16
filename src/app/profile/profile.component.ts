import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {

    constructor() { }

    socialNetworks: string[] = ["Instagram", "Youtube", "Twitter"];
    sortOrdersIcons: string[] = ["fa fa-instagram", "fa fa-youtube", "fa fa-twitter"];
    selectedSortOrder: string = this.socialNetworks[0];
    selectedSortOrderIcon: string = this.sortOrdersIcons[0];
    currDiv: string = this.socialNetworks[0];

    ngOnInit() {}

    ChangeSortOrder(selectedSocialNetwork: string) { 
        this.selectedSortOrder = selectedSocialNetwork;
        this.selectedSortOrderIcon = "fa fa-" + selectedSocialNetwork.toLowerCase();
        this.currDiv = selectedSocialNetwork;
        
    }

}
