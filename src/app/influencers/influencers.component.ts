import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserInterface } from '../models/user-interface';
import { AgeFromDateString } from 'age-calculator';
import noUiSlider from "nouislider";
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandProfileComponent } from '../brand-profile/brand-profile.component';



@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit, AfterViewInit {

  private users: UserInterface[] = []; 
  private selectedUsers: UserInterface[] = []; 

  private usersAge: string[] = [];
  private birthday: any = {
    year: "",
    month: "",
    day: ""
  }
  private demografyVisible: boolean = false;
  private platformVisible: boolean = false;
  private countryVisible: boolean = false;
  private idiomVisible: boolean = false;
  private priceVisible: boolean = false;
  private tagsVisible: boolean = false;
  
  private countries: string[] = ["España", "UK", "USA", "Suiza", "Canada", "Japón", "Alemaña"];
  private idioms: string[] = ["Español", "Inglés", "Catalán", "Sueco", "Alemán", "Francés"];
  private socials: string[] = ["Instagram", "Youtube", "Blogs", "Tik Tok", "Twitter", "Facebook"];
  private tags: string[] = [];
  private filters: string[] = ["Calidad: Más A menos", "Calidad: Menos A más", "Influencia: Más A menos", "Influencia: Menos A más", "Engagement: Más A menos", "Engagement: Menos A más", "Afinidad: Más A menos", "Afinidad: Menos A más",];
  private selectedFilter: string = this.filters[0];
  private selectedProductId: string = "";


  constructor(private router: Router, private spinner: NgxSpinnerService, private productService: ProductsService, private authService: AuthService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getProductId();
    this.getAllInfluencers();
    this.getTags();
  }

  ngAfterViewInit(){
    
  }

  getProductId(){
    this._Activatedroute.paramMap.subscribe(params => { 
      this.selectedProductId = params.get('id');
    });
  }

  getAllInfluencers(){ 
    if(this.authService.getCurrentUser()){
      return this.authService.getInfluencers(this.authService.getCurrentUser().id, "")
      .subscribe(data => {
        console.log("Getting user products...");
        this.users = data;
        this.getUserAge();
        this.formatUserName();
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

  addCampaign(influencerId: string, index: number){
    if(this.authService.getCurrentUser() && this.selectedProductId){
      this.selectedUsers.push(this.users[index]);
      this.users.splice(index,1);
    }    
  }

  removeSelected(index: number){
    this.users.push(this.selectedUsers[index]);
    this.selectedUsers.splice(index, 1);
  }

  insertCampaign(){
    this.spinner.show();
    this.getProductAndInfluencer();
  }

  getProductAndInfluencer(){
    var product;
    var influencer;
      this.productService.getProductById(this.selectedProductId)
      .subscribe(data => {
        product = data[0]; 
        if(product){
          for (let i = 0; i < this.selectedUsers.length; i++) {
            this.authService.getUserById(this.selectedUsers[i].id)
            .subscribe(data => {
              influencer = data[0];
                if(i == this.selectedUsers.length){
                  this.addNewCampaign(product, influencer);
                }else{
                  this.authService.addCampaign(this.authService.getCurrentUser().id, product, influencer, "0", "0", false, "")
                  .subscribe(data => {
                    this.spinner.hide();
                    this.router.navigateByUrl('/campaigns');
                  },
                  error => {
                    console.log(error);
                  });
                }
            },
            error => {
              console.log(error);
            });     
          }
        }  
      },
      error => {
        console.log(error);
      });

      
  }

  addNewCampaign(product, influencer){
    this.authService.addCampaign(this.authService.getCurrentUser().id, product, influencer, "0", "0", false, "") 
      .subscribe(data => {
      },
      error => {
        console.log(error);
      });
  }

  formatUserName(){
    for (let i = 0; i < this.users.length; i++) {
      var splitted = this.users[i].username.split(" "); 
      var username = "";
      for (let i = 0; i < splitted.length; i++) {
          username += splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1).toLowerCase() + " ";
      }
      this.users[i].username = username;
    }
  }

  setVisible(id: number){
    switch (id) {
      case 0: // Demografia
        if (this.demografyVisible) {
          this.demografyVisible = false;
          return;
        }
        this.setDemografyVisible();
        break;

      case 1: // Plataformas
        if(this.platformVisible){
          this.platformVisible = false;
          return;
        }
        this.setPlatformVisible();
        break;

      case 2: // Precio
        if(this.priceVisible){
          this.priceVisible = false;
          return;
        }
        this.setPriceVisible();
        break;

      case 3: // Precio
        if(this.tagsVisible){
          this.tagsVisible = false;
          return;
        }
        this.tagsVisible = true;
        break;
    
      default:
        break;
    }
  }

  setMiniVisible(id: number){
    if (this.countryVisible) {
      this.countryVisible = false;
      return;
    }

    if(this.idiomVisible){
      this.idiomVisible = false;
      return;
    }

    switch (id) {
      case 0:
        this.countryVisible = true;
        break;

      case 1:
        this.idiomVisible = true;
        break
    
      default:
        break;
    }
  }

  setDemografyVisible(){
    this.demografyVisible = true;
    setTimeout(function () {
      var slider2 = document.getElementById("input-slider-range");
      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 50
        },
        // Move handle on tap, bars are draggable
        behaviour: 'tap-drag',
        tooltips: true,
        step: 1,
        format: {
          // 'to' the formatted value. Receives a number.
          to: function (value) {
            if(value=== 50) return "+" + value;
            return value;
          },
          // 'from' the formatted value.
          // Receives a string, should return a number.
          from: function (value) {
              return Number(value.replace('', ''));
          }
        }
      });
    }, 1000/60);
  }

  setPlatformVisible(){
    this.platformVisible = true;
    setTimeout(function () {
      var slider2 = document.getElementById("input-slider-range-followers");
      noUiSlider.create(slider2, {
        start: [10, 1000],
        connect: true,
        range: {
          min: 0,
          max: 1000
        },
        // Move handle on tap, bars are draggable
        behaviour: 'tap-drag',
        tooltips: true,
        step: 10,
        format: {
          // 'to' the formatted value. Receives a number.
          to: function (value) {
            if(value=== 1000) return "+1M";
            return value + "K";
          },
          // 'from' the formatted value.
          // Receives a string, should return a number.
          from: function (value) {
              return Number(value.replace('', ''));
          }
        }
      });
    }, 1000/60);
  }

  setPriceVisible(){
    this.priceVisible = true;
    setTimeout(function () {
      var slider2 = document.getElementById("input-slider-range-price");
      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100
        },
        // Move handle on tap, bars are draggable
        behaviour: 'tap-drag',
        tooltips: true,
        step: 1,
        format: {
          // 'to' the formatted value. Receives a number.
          to: function (value) {
            return value + " <i class='fa fa-diamond' aria-hidden='true'></i>";
          },
          // 'from' the formatted value.
          // Receives a string, should return a number.
          from: function (value) {
              return Number(value.replace('', ''));
          }
        }
      });
    }, 1000/60);
  }

  getTags(){
    return this.productService.getTags()
    .subscribe(data => {
      console.log("Getting tags..."); 
      for (let i = 0; i < data.length; i++) {
        this.tags.push(data[i].name); 
      }
    },
    error => {
      console.log(error);
    });
  }

  changeFilter(filter: string){
    this.selectedFilter = filter;
  }

  search(){
    var inputValue = (<HTMLInputElement>document.getElementById("namesearch")).value; 
    if(this.authService.getCurrentUser()){
      return this.authService.getInfluencers(this.authService.getCurrentUser().id, inputValue)
      .subscribe(data => {
        console.log("Getting user products...");
        this.users = data;
        this.getUserAge();
        this.formatUserName();
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  goToLink(url: string, username: string){
    window.open(url + username, "_blank");
  }
}

