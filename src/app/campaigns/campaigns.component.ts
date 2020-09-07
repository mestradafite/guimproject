import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { CampaignInterface } from "../models/campaign-interface";
import { NgxSpinnerService } from "ngx-spinner";
import { UserInterface } from '../models/user-interface';
import { AgeFromDateString } from 'age-calculator';
import { ProductInterface } from '../models/product-interface';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  private campaigns: CampaignInterface[] = [];
  private influencers: UserInterface[] = [];
  private user: UserInterface;
  private influencernames: string[] = [];
  private influencerages: string[] = [];
  private products: ProductInterface[] = [];
  private campaignStartDate: string[] = [];

  constructor(private authService: AuthService, private productService: ProductsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getCampaigns();
  }

  getCampaigns(){
    if(this.authService.getCurrentUser()){
      this.spinner.show();
      return this.authService.getCampaigns(this.authService.getCurrentUser().id)
      .subscribe(data => {
        console.log("Getting user campaigns...");
        this.campaigns = data;
        this.getCampaignStartDate();
        this.getProductInfo();
        this.getInfluencerInfo();
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  getCampaignStartDate(){
    for (let i = 0; i < this.campaigns.length; i++) {
      var a = new Date(this.campaigns[i].createdAt);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var month = months[a.getMonth()];
      var year = a.getFullYear();
      var date = a.getDate();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var time = date + ' ' + month + ' ' + year;
      this.campaignStartDate[i] = time;
    }
  }

  getInfluencerInfo(){
    for (let i = 0; i < this.campaigns.length; i++) { 
      this.authService.getUserById(this.campaigns[i].influencerId)
        .subscribe(data => {
          console.log("Getting user info from campaigns...");
          this.influencers[i] = data[0];
          this.getUserInfoFormatted(this.influencers[i], i);
        },
        error => {
          console.log(error);
        });
    }
  }

  getProductInfo(){
    for (let i = 0; i < this.campaigns.length; i++) {
      this.productService.getProductById(this.campaigns[i].productId)
        .subscribe(data => {
          console.log("Getting product info from campaigns...");
          this.products[i] = data[0];
        },
        error => {
          console.log(error);
        });
    }
  }

  getUserInfoFormatted(user: UserInterface, index: number){
    // User name
    var splitted = user.username.split(" "); 
    var username = "";
    for (let i = 0; i < splitted.length; i++) {
        username += splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1).toLowerCase() + " ";
    }  
    this.influencernames[index] = username;

    // User age
    var birthday: any = {
      year: "",
      month: "",
      day: ""
    }

    if(user.birthDay){
      birthday = user.birthDay;
      let ageFromString = new AgeFromDateString(birthday.year + "-" + birthday.month + "-" + birthday.day).age;
      this.influencerages[index] = String(ageFromString);
    }
  }
}
