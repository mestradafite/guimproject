import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { UserSettingsInterface } from '../models/user-settings-interface';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private limits: string[] = ["Sin Límite", "3", "10"];
  private selectedLimit: string = this.limits[0];
  private languages: string[] = ["ESP", "CAT", "ENG"];
  private selectedLanguage: string = this.languages[0];
  private categories:string[] = [];
  private tags: string[] = [];
  selectedTags: string[] = [];
  selectedCategories: string[] = [];


  private userSettings: UserSettingsInterface = {
    userid: "",
    boxlimit: "",
    price: "",
    locale: "",
    categories: "",
    tags: "",
    account: "",
    vacationMode: false   
  }


  constructor(private spinner: NgxSpinnerService, private productService: ProductsService, private authService: AuthService) { }


  ngOnInit(): void {
    this.getUserSettings();
    this.getCategories();
    this.getTags();
  }

  updateSettings(){
    this.spinner.show();    
    this.authService.setCurrentUserSettings(this.authService.getCurrentUser().id, this.userSettings.boxlimit, 
                                            this.userSettings.price, this.userSettings.locale, this.userSettings.categories, 
                                            this.userSettings.tags, this.userSettings.account, this.userSettings.vacationMode)
    .subscribe(data => {
      console.log("Settings Submited!");
      this.authService.setUserSettings(this.userSettings);
      this.getUserSettings();
      this.spinner.hide();
    },
    error => {
      console.log(error);
    });
  }

  getUserSettings(){
    this.userSettings = this.authService.getCurrentUserSettings();
    if(this.userSettings.boxlimit!== "" &&  this.userSettings.boxlimit!== undefined){
      this.selectedLimit = this.userSettings.boxlimit;
    }

    if(this.userSettings.locale!== "" && this.userSettings.locale!== undefined){
      this.selectedLanguage = this.userSettings.locale;
    }
  }

  getCategories(){
    return this.productService.getCategories()
    .subscribe(data => {
      console.log("Getting categories...");
      this.categories.push("Todas (" + data.length + ")" );
      for (let i = 0; i < data.length; i++) {
        this.categories.push(data[i].name); 
        this.addCategory(data[i].name);
      }
    },
    error => {
      console.log(error);
    });
  }

  getTags(){
    return this.productService.getTags()
    .subscribe(data => {
      console.log("Getting tags...");
      this.tags.push("Todas (" + data.length + ")" );
      for (let i = 0; i < data.length; i++) {
        this.tags.push(data[i].name); 
        this.addTag(data[i].name);
      }
    },
    error => {
      console.log(error);
    });
  }

  changeLimit(selectedLimit: string) { 
    this.selectedLimit = selectedLimit;
    if(selectedLimit === this.limits[0]){
      this.userSettings.boxlimit = "";
    }else{
      this.userSettings.boxlimit = this.selectedLimit;
    }
  }

  changeLocale(selectedLanguage: string){
    this.selectedLanguage = selectedLanguage;
    this.userSettings.locale = this.selectedLanguage;
  }

  addTag(selectedTag: string){
    this.selectedTags.push(selectedTag);
    this.tags = this.tags.filter(item => item != selectedTag);
    this.setProductTags();
  }

  removeTag(selectedTag: string){
    this.selectedTags = this.selectedTags.filter(item => item != selectedTag);
    this.tags.push(selectedTag);
    this.setProductTags();
  }

  setProductTags(){
    var tagsString = "";
    for (let i = 0; i < this.selectedTags.length; i++) {
      tagsString = tagsString + this.selectedTags[i] + ",";
    }
    this.userSettings.tags = tagsString;
  }

  addCategory(selectedCategory: string){
    this.selectedCategories.push(selectedCategory);
    this.categories = this.categories.filter(item => item != selectedCategory);
    this.setProductCategory();
  }

  removeCategory(selectedCategory: string){
    this.selectedCategories = this.selectedCategories.filter(item => item != selectedCategory);
    this.categories.push(selectedCategory);
    this.setProductCategory();
  }

  setProductCategory(){
    var categoriesString = "";
    for (let i = 0; i < this.selectedCategories.length; i++) {
      categoriesString = categoriesString + this.selectedCategories[i] + ",";
    }
    this.userSettings.categories = categoriesString;
  }

}
