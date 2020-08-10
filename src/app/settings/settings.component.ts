import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { UserSettingsInterface } from '../models/user-settings-interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private limits: string[] = ["Sin Límite"];
  private languages: string[] = ["ESP", "CAT", "ENG"];
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
    vacationMode: ""   
  }


  constructor(private productService: ProductsService, private authService: AuthService) { }


  ngOnInit(): void {
    this.getUserSettings();
    this.getCategories();
    this.getTags();
  }

  getUserSettings(){
    this.userSettings = this.authService.getCurrentUserSettings();
    console.log(this.userSettings[0]);
    
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
