import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { CampaignInterface } from '../models/campaign-interface';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  private user: UserInterface;
  private pendingCampaigns: CampaignInterface[] = [];
  private inProgressCampaigns: CampaignInterface[] = [];


  constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getUserPendingRequests();
    this.getUserInProgressCampaigns();
  }

  getUserPendingRequests(){
    if(this.authService.getCurrentUser()){
      this.spinner.show();
      return this.authService.getRequests(this.authService.getCurrentUser().id, "0")
      .subscribe(data => {
        console.log("Getting user requests...");
        this.pendingCampaigns = data;

        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  getUserInProgressCampaigns(){
    if(this.authService.getCurrentUser()){
      this.spinner.show();
      return this.authService.getRequests(this.authService.getCurrentUser().id, "1")
      .subscribe(data => {
        console.log("Getting user requests...");
        this.inProgressCampaigns = data;
        this.spinner.hide();
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

  acceptRequest(campaignId: string){
    this.spinner.show();
      return this.authService.updateCampaign(campaignId, "1")
      .subscribe(data => {
        console.log("Aceptando solicitud");
        this.spinner.hide();
        window.location.reload();
      },
      error => {
        console.log(error);
      });
  }

}
