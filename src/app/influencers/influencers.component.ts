import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserInterface } from '../models/user-interface';
import { AgeFromDateString } from 'age-calculator';
import noUiSlider from "nouislider";
import { ProductsService } from '../services/products.service';
import { BrandProfileComponent } from '../brand-profile/brand-profile.component';



@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit, AfterViewInit {

  private users: UserInterface[] = [];
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
  private filters: string[] = ["Calidad: Más a menos", "Calidad: Menos a más"];
  private selectedFilter: string = this.filters[0];


  constructor(private spinner: NgxSpinnerService, private productService: ProductsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllInfluencers();
    this.getTags();
  }

  ngAfterViewInit(){
    
  }

  getAllInfluencers(){ 
    if(this.authService.getCurrentUser()){
      return this.authService.getInfluencers(this.authService.getCurrentUser().id, "")
      .subscribe(data => {
        console.log("Getting user products...");
        this.users = data;
        this.getUserAge();
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
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }
    

}

