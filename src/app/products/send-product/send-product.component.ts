import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from "../../models/product-interface";

@Component({
  selector: 'app-send-product',
  templateUrl: './send-product.component.html',
  styleUrls: ['./send-product.component.css']
})
export class SendProductComponent implements OnInit {

  private products: ProductInterface[] = [];

  constructor(private authService: AuthService, private productService: ProductsService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    if(this.authService.getCurrentUser()){
      return this.productService.getUserProducts(this.authService.getCurrentUser().id)
      .subscribe(data => {
        console.log("Getting user products...");
        this.products = data;
      },
      error => {
        console.log(error);
      });
    }
  }

}
