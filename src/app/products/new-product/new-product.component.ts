import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from "../../models/product-interface";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  selectedFile: File = null;
  step1;
  step2;
  step3;
  actualStep;

  constructor(private authService: AuthService, private productsService: ProductsService, private http: HttpClient, private router: Router) { }

  categories: string[] = ["Shirt", "Sunglasses", "Pantalones"];
  selectedSortOrder: string = "Selecciona una categoria";

  private product: ProductInterface = {
    id: "",
    userid: "",
    urlimages: "",
    name: "",
    category: "",
    tags: "",
    url: "",
    sizes: "",
    price: "",
    description: ""   
  }

  ngOnInit(): void {
    this.step1 = document.getElementById('step1');
    this.step2 = document.getElementById('step2');
    this.step3 = document.getElementById('step3');
    this.step2.classList.add("hidden");
    this.step3.classList.add("hidden");
    this.actualStep = this.step1;
  }

  insertProduct(){
    console.log(this.product);
    
    /*if(this.authService.getCurrentUser()){
      return this.productsService.insertproduct(this.authService.getCurrentUser().id, this.product.urlimages, this.product.name, this.product.category, 
                                                this.product.tags, this.product.url, this.product.sizes, 
                                                this.product.price, this.product.description)
      .subscribe(data => {
        console.log("Product Submited!");
        this.router.navigateByUrl('/send-product');
      },
      error => {
        console.log(error);
      });
    }*/
  }

  nextStep(stepNum: number){
    let prevStepButton = document.getElementById('step'+(stepNum-1) + 'Button');
    prevStepButton.classList.remove('btn-primary');
    prevStepButton.classList.add('btn-default');

    let nextStepButton = document.getElementById('step'+stepNum + 'Button');
    nextStepButton.classList.remove('btn-default');
    nextStepButton.classList.add('btn-primary');

    let nextStep = document.getElementById('step'+stepNum);
    this.actualStep.parentNode.removeChild(this.actualStep);
    this.actualStep = nextStep;
    nextStep.classList.remove('hidden');
  }

  ChangeSortOrder(selectedCategory: string) { 
    this.selectedSortOrder = selectedCategory;
    this.product.category = this.selectedSortOrder;
    
}

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    //Subir imagen
    /*const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
      .subscribe(res => {
        console.log(res);
      });
    this.http.post('', fd);*/
  }
}
