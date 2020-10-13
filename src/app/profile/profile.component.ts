import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { InstagramService } from '../services/instagram.service';
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

    private followers;
    private comments;
    private instagramEngagement;
    private averageLikes;
    private averageComments;

    constructor(private authService: AuthService, private instagramService: InstagramService) { }

    socialNetworks: string[] = ["Instagram", "Youtube", "Twitter"];
    sortOrdersIcons: string[] = ["fa fa-instagram", "fa fa-youtube", "fa fa-twitter"];
    selectedSortOrder: string = this.socialNetworks[0];
    selectedSortOrderIcon: string = this.sortOrdersIcons[0];
    currDiv: string = this.socialNetworks[0];

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        console.log(this.user);
        this.getInstagramInfo();
        
        this.getUserAge();
        this.formatUserName();
    } 

    getInstagramInfo(){
        if(this.user){
            return this.instagramService.getInstagramInfoByUsername(this.user.instagramUserName)
            .subscribe(data => {
              console.log("Getting instagram information...");
              this.followers = data.graphql.user.edge_followed_by.count;
              this.getInstagramEngagement(data);
              
            },
            error => {
              console.log(error);
            });
          }
    }

    getInstagramEngagement(data){
        let days = Array(7).fill({
            dayPosts: 0,
            dayLikes: 0,
            dayComments: 0,
            avgDayLikes: 0,
            avgDayComments: 0,
        });
        let comments = 0,
            likes = 0,
            count = 0,
            likesEngagement,
            commentsEngagement;

        for (let node of data.graphql.user.edge_owner_to_timeline_media.edges) {
            const day = new Date(node.node.taken_at_timestamp * 1000).getDay();
            days[day] = Object.assign({}, days[day], {
                dayPosts: days[day].dayPosts + 1,
                dayComments: days[day].dayComments + node.node.edge_media_to_comment.count,
                dayLikes: days[day].dayLikes + node.node.edge_media_preview_like.count,
            });
            likes += node.node.edge_media_preview_like.count;
            comments += node.node.edge_media_to_comment.count;
            count++;
        }
        
        this.averageLikes = Math.round((likes / count) || 0);
        this.averageComments = Math.round((comments / count) || 0);

        // Engagement likes  = (avegare likes / followers) * 100       
        likesEngagement = (this.averageLikes / this.followers) *100;
        console.log(likesEngagement);
        

        // Engagement Comments = (average comments / followers) * 100
        commentsEngagement = (this.averageComments / this.followers) * 100;
        console.log(commentsEngagement);
        

        // ENGAGEMENT = engagement likes + engagement comments
        this.instagramEngagement = Math.round(likesEngagement + commentsEngagement);
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
