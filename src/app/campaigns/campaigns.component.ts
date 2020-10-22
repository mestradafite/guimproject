import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { CampaignInterface } from "../models/campaign-interface";
import { NgxSpinnerService } from "ngx-spinner";
import { UserInterface } from '../models/user-interface';
import { CampaignOptions } from '../models/campaignOptions-interface';
import { AgeFromDateString } from 'age-calculator';
import { ProductInterface } from '../models/product-interface';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'] 
})
export class CampaignsComponent implements OnInit {

  private pendingCampaigns: CampaignInterface[] = [];
  private inProgreessCampaigns: CampaignInterface[] = [];
  private user: UserInterface;
  private influencerages: string[] = [];
  private campaignStartDate: string[] = [];
  private progressVisible: boolean[] = [];
  private options: CampaignOptions[] = [];


  constructor(private authService: AuthService, private productService: ProductsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getPendingCampaigns();
    this.getInProgreessCampaigns();
    //this.getEndedCampaigns();
  }

  getPendingCampaigns(){
    if(this.authService.getCurrentUser()){
      this.spinner.show();
      return this.authService.getCampaigns(this.authService.getCurrentUser().id, "0")
      .subscribe(data => {
        console.log("Getting user campaigns...");
        this.pendingCampaigns = data;
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  getInProgreessCampaigns() {
    if(this.authService.getCurrentUser()){
      this.spinner.show();
      return this.authService.getCampaigns(this.authService.getCurrentUser().id, "1")
      .subscribe(data => {
        console.log("Getting user campaigns...");
        this.setProgressVisible();
        this.inProgreessCampaigns = data;
      },
      error => {
        console.log(error);
      });
    }
  }

  getCampaignStartDate(timestamp){
    var a = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var year = a.getFullYear();
    var date = a.getDate();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }

  getUserName(name: string){
    // User name
    var splitted = name.split(" "); 
    var username = "";
    for (let i = 0; i < splitted.length; i++) {
        username += splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1).toLowerCase() + " ";
    }  
    return username;
  }

  getUserInfoFormatted(user: UserInterface){
    // User age
    var birthday: any = {
      year: "",
      month: "",
      day: ""
    }

    if(user.birthDay){
      birthday = user.birthDay;
      let ageFromString = new AgeFromDateString(birthday.year + "-" + birthday.month + "-" + birthday.day).age;
      return String(ageFromString);
    }
  }

  setProgressVisible(){
    for (let i = 0; i < this.inProgreessCampaigns.length; i++) {
      this.progressVisible[i] = false;
    }
  }

  validate(campaignId: string, index: number, option: any){
    this.spinner.show();
    option.validated = true;
    
    return this.authService.updateCampaign(campaignId, "1", false, "", this.inProgreessCampaigns[index].options) 
    .subscribe(data => {
      console.log("Aceptando solicitud");
      this.spinner.hide();
    },
    error => {
      console.log(error);
    });
  }

  setProgressDivVisible(index: number){
    if(this.progressVisible[index]) this.progressVisible[index] = false;
    else this.progressVisible[index] = true;
  }
}
