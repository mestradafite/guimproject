import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from "../../models/product-interface";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-send-product', 
  templateUrl: './send-product.component.html',
  styleUrls: ['./send-product.component.css']
})
export class SendProductComponent implements OnInit {

  private products: ProductInterface[] = [];
  private tags: any = [];
  private sizes: any[] = [];
  private disabledSizes: any[] = []
  private allSizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"]

  constructor(private spinner: NgxSpinnerService, private authService: AuthService, private productService: ProductsService ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getProducts();
  }

  getProducts(){ 
    if(this.authService.getCurrentUser()){
      return this.productService.getUserProducts(this.authService.getCurrentUser().id)
      .subscribe(data => {
        console.log("Getting user products...");
        this.products = data;
        this.getTags();
        this.getSizes();
        this.spinner.hide();
      },
      error => {
        console.log(error);
      });
    }
  }

  getTags(){
    for (let i = 0; i < this.products.length; i++) {
      this.tags[i] = this.products[i].tags.split(",");
    }
  }

  getSizes(){
    for (let i = 0; i < this.products.length; i++) {
      // delete last '/'
      this.products[i].sizes = this.products[i].sizes.slice(0, -1);
      this.allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
      this.sizes[i] = this.products[i].sizes.split("/");
      for (const element of this.sizes[i]) {
        if(element){
          this.allSizes = this.allSizes.filter(obj => obj !== element);
        }
      }
      this.disabledSizes[i] = this.allSizes;
    }    
  }

}
