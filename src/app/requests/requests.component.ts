import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { CampaignOptions } from '../models/campaignOptions-interface';
import { CampaignInterface } from '../models/campaign-interface';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  private user: UserInterface;
  private options: CampaignOptions[] = [];
  private pendingCampaigns: CampaignInterface[] = [];
  private inProgressCampaigns: CampaignInterface[] = [];
  private completedCampaigns: CampaignInterface[] = [];
  private brandNames: string[] = [];
  private response: string;
  private checkBoxValidated: boolean[] = [];
  private progressVisible: boolean[] = [];

  private instStry: boolean[] = [];
  private instPost: boolean[] = [];
  private blogProd: boolean[] = [];
  private blogBrand: boolean[] = [];
  private cupon: boolean[] = [];
  private ytbInit: boolean[] = [];
  private ytbDuring: boolean[] = [];
  private ytbAll: boolean[] = [];
  private twtOne: boolean[] = [];
  private tikOnePost: boolean[] = [];
  private fcbkPost: boolean[] = [];

  private OPTIONS: number = 11;
  private allOptionsChecked: boolean[] = [];
  private visibleOptions: number = 0;


  constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.OPTIONS; i++) {
      this.instStry[i] = false;
      this.instPost[i] = false;
      this.blogProd[i] = false;
      this.blogBrand[i] = false;
      this.cupon[i] = false;
      this.ytbInit[i] = false;
      this.ytbDuring[i] = false;
      this.ytbAll[i] = false;
      this.twtOne[i] = false;
      this.tikOnePost[i] = false;
      this.fcbkPost[i] = false;
    }

    this.getUserPendingRequests();
    this.getUserInProgressCampaigns();
    this.getUserCompletedCampaigns();
  }

  getUserPendingRequests(){
    if(this.authService.getCurrentUser()){
      this.spinner.show();
      return this.authService.getRequests(this.authService.getCurrentUser().id, "0")
      .subscribe(data => {
        console.log("Getting user requests...");
        this.pendingCampaigns = data;
        this.getBrandName(this.pendingCampaigns);
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
        this.getBrandName(this.inProgressCampaigns);
        this.setProgressVisible();
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  getUserCompletedCampaigns(){
    if(this.authService.getCurrentUser()){
      this.spinner.show();
      return this.authService.getRequests(this.authService.getCurrentUser().id, "2")
      .subscribe(data => {
        console.log("Getting user requests...");
        this.completedCampaigns = data;
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  getBrandName(campaigns: any){
    for(let campaign of campaigns){
      return this.authService.getUserById(campaign.product.userid)
      .subscribe(data => {
        this.brandNames.push(data[0].username);
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

  acceptRequest(campaignId: string, index: number){
    this.checkCheckBoxes();
    if(this.checkBoxValidated[index]){
      this.spinner.show();
        return this.authService.updateCampaign(campaignId, "1", false, "", this.options[index]) 
        .subscribe(data => {
          console.log("Aceptando solicitud");
          this.spinner.hide();
          window.location.reload();
        },
        error => {
          console.log(error);
        });
    }else{
      console.log("No hay ningun checked");
    }
  }

  checkCheckBoxes(){
    for (let i = 0; i < this.pendingCampaigns.length; i++) {
      this.checkBoxValidated[i] = false;
      this.options.push(this.pendingCampaigns[i].options);
      
      if(this.instStry[i])      { this.checkBoxValidated[i] = true; this.options[i].instStry.visible = this.instStry[i]; }
      if(this.instPost[i]) { this.checkBoxValidated[i] = true; this.options[i].instPost.visible = this.instPost[i]; }
      if(this.blogProd[i]) { this.checkBoxValidated[i] = true; this.options[i].blogProd.visible = this.blogProd[i]; }
      if(this.blogBrand[i]){ this.checkBoxValidated[i] = true; this.options[i].blogBrand.visible = this.blogBrand[i]; }
      if(this.cupon[i]) { this.checkBoxValidated[i] = true; this.options[i].cupon.visible = this.cupon[i]; }
      if(this.ytbInit[i]) { this.checkBoxValidated[i] = true; this.options[i].ytbInit.visible = this.ytbInit[i]; }
      if(this.ytbDuring[i]) { this.checkBoxValidated[i] = true; this.options[i].ytbDuring.visible = this.ytbDuring[i]; }
      if(this.ytbAll[i]) { this.checkBoxValidated[i] = true; this.options[i].ytbAll.visible = this.ytbAll[i]; }
      if(this.twtOne[i]) { this.checkBoxValidated[i] = true; this.options[i].twtOne.visible = this.twtOne[i]; }
      if(this.tikOnePost[i]) { this.checkBoxValidated[i] = true; this.options[i].tikOnePost.visible = this.tikOnePost[i]; }
      if(this.fcbkPost[i]) { this.checkBoxValidated[i] = true; this.options[i].fcbkPost.visible = this.fcbkPost[i]; }
    }
  }

  setProgressVisible(){
    for (let i = 0; i < this.inProgressCampaigns.length; i++) {
      this.progressVisible[i] = false;
      this.allOptionsChecked[i] = false;
      this.checkOptionsValidated(i);
    }
  }

  setProgressDivVisible(index: number){
    if(this.progressVisible[index]) this.progressVisible[index] = false;
    else this.progressVisible[index] = true;
  }

  showAcceptOptions(divId: string){
    document.getElementById("cancel"+divId).hidden = true;
    document.getElementById("accept"+divId).hidden = !document.getElementById("accept" + divId).hidden;

  }

  cancelOptions(divId: string){
    document.getElementById("accept"+divId).hidden = true;
    document.getElementById("cancel"+divId).hidden = !document.getElementById("cancel" + divId).hidden;
  }

  finalizeRequest(campaignId){
    this.spinner.show();
    return this.authService.updateCampaign(campaignId, "2", false, "", null) // "2" estado finalizado
    .subscribe(data => {
      console.log("Finalizando solicitud");
      this.spinner.hide();
      window.location.reload();
    },
    error => {
      console.log(error);
    });
  }

  declineRequest(campaignId){
    this.spinner.show();
      return this.authService.updateCampaign(campaignId, "0", true, this.response, null)
      .subscribe(data => {
        console.log("Cancelando solicitud");
        this.spinner.hide();
        window.location.reload();
      },
      error => {
        console.log(error);
      });
  }

  validate(campaignId: string, index: number, option: any){
    this.spinner.show();
    option.validated = true;

    return this.authService.updateCampaign(campaignId, "1", false, "", this.inProgressCampaigns[index].options) 
    .subscribe(data => {
      console.log("Aceptando solicitud");
      this.checkOptionsValidated(index);
      this.spinner.hide();
    },
    error => {
      console.log(error);
    });
  }

  checkOptionsValidated(index: number) {
    var visibleOptionsChecked = 0;
    for (let i = 0; i < this.pendingCampaigns.length; i++) {
      console.log(this.pendingCampaigns[i]);
      
    }
    /*if (option.validated) {
      visibleOptionsChecked++
    }*/
      

    //if(visibleOptionsChecked == this.visibleOptions) this.allOptionsChecked[index] = true;
  }
}
