import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { ProductInterface } from "../models/product-interface";
import { NgxSpinnerService } from "ngx-spinner";
import { UserInterface } from '../models/user-interface';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {

  private users: UserInterface[] = [];

  constructor(private spinner: NgxSpinnerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllInfluencers();
  }

  getAllInfluencers(){ 
    if(this.authService.getCurrentUser()){
      return this.authService.getInfluencers(this.authService.getCurrentUser().id)
      .subscribe(data => {
        console.log("Getting user products...");
        this.users = data;
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

}

