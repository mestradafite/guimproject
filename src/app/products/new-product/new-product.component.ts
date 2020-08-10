import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from "../../models/product-interface";
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  private alertErrorVisible: boolean;

  selectedFile: File = null;
  closeResult: string;
  step1;
  step2;
  step3;
  actualStep;
  public imgURL: any;

  constructor(private spinner: NgxSpinnerService, private modalService: NgbModal, private authService: AuthService, private productsService: ProductsService, private http: HttpClient, private router: Router) { 
    this.alerts.push({
      id: 1,
      type: 'success',
      strong: 'Correcto!',
      message: 'Usuario conectado, redirigiendo...',
      icon: 'ni ni-like-2'
  }, {
      id: 2,
      strong: 'Info!',
      type: 'info',
      message: 'This is an info alert—check it out!',
      icon: 'ni ni-bell-55'
  }, {
      id: 3,
      type: 'warning',
      strong: 'Warning!',
      message: 'This is a warning alert—check it out!',
      icon: 'ni ni-bell-55'
  }, {
      id: 4,
      type: 'danger',
      strong: 'Error!',
      message: 'Ha habido un problema durante la creación del producto, lamentamos las molestias...',
      icon: 'ni ni-support-16'
  });
  this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  @ViewChild('noImage') 
  private content: TemplateRef<any>;
  @ViewChild('submitProduct') 
  private contentSubmitProduct: TemplateRef<any>;

  private PRODUCTO_PROD = "https://fjdpswr5d2.execute-api.us-east-1.amazonaws.com/dev";
  categories: string[] = [];
  sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"];
  sizesEnabled: boolean[] = [];
  selectedSortOrder: string = "Selecciona una categoria";

  selectedSortOrderTags: string = "Selecciona varias etiquetas"
  tags: string[] = [];
  selectedTags: string[] = [];

  private product: ProductInterface = {
    id: "",
    userid: "",
    urlimages: "",
    name: "",
    category: "",
    tags: "",
    url: "",
    sizes: "",
    description: ""   
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTags();
    this.step1 = document.getElementById('step1');
    this.step2 = document.getElementById('step2');
    this.step3 = document.getElementById('step3');
    this.step2.classList.add("hidden");
    this.step3.classList.add("hidden");
    
    this.actualStep = this.step1;
    for (let i = 0; i < this.sizes.length; i++) {
      this.sizesEnabled[i] = false;
    }
  }

  insertProduct(){    
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
    }, 6000 * 5);
    if(this.authService.getCurrentUser()){
      this.uploadImage();
    }
  }

  uploadImage(){
    this.getURLImage(this.selectedFile); 
  }

  getURLImage(file: File) {
    var imageURL = "";
    var self = this;
    
    fetch(this.PRODUCTO_PROD+"/uploadimage", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: file.type
      })
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      imageURL = json.imageURL;
      return fetch(json.uploadURL, {
        method: "PUT",
        body: file
      })
    })
    .then(function(){
      self.product.urlimages = imageURL;
      console.log(self.product.urlimages);
      
      self.uploadProduct();
    });
  }

  uploadProduct(){
    this.productsService.insertproduct(this.authService.getCurrentUser().id, this.product.urlimages, this.product.name, this.product.category, 
                                              this.product.tags, this.product.url, this.product.sizes, this.product.description)
    .subscribe(data => {
      console.log("Product Submited!");
      this.router.navigateByUrl('/send-product');
      this.spinner.hide();
    },
    error => {
      this.alertErrorVisible = true;
      console.log(error);
    });
  }

  getProductSizes(){
    for (let i = 0; i < this.sizes.length; i++) {
      if(this.sizesEnabled[i]){
        this.product.sizes = this.product.sizes  + this.sizes[i] + "/";
      } 
    }
  }

  getCategories(){
    return this.productsService.getCategories()
    .subscribe(data => {
      console.log("Getting categories...");
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.categories.push(data[i].name); 
      }
    },
    error => {
      console.log(error);
    });
  }

  getTags(){
    return this.productsService.getTags()
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

  nextStep(stepNum: number){
    if(stepNum === 2){
      if(this.imgURL===undefined) {
        this.open(this.content, 'Notification', '');
      }else{
        this.changeStep(stepNum);
      } 
    }
    if(stepNum === 3){
      if(!this.checkInfoProduct()) {
        this.open(this.contentSubmitProduct, 'Notification', '');
      }else{
        this.changeStep(stepNum);
      } 
    }
  }
  
  changeStep(stepNum: number){
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

  checkInfoProduct(){
    this.getProductSizes();
    if (this.authService.getCurrentUser().id === "" ||
        this.product.name === ""        || 
        this.product.category === ""    ||
        this.product.tags === ""        ||
        this.product.url === ""         ||
        this.product.sizes === ""       ||
        this.product.description === ""){
      return false;
    }else{
      return true;
    }
  }

  ChangeSortOrder(selectedCategory: string) { 
    this.selectedSortOrder = selectedCategory;
    this.product.category = this.selectedSortOrder;
    
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];

    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      console.log("Only images are supported.");
      this.open(this.content, 'Notification', '');
      return;
    }
    var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile); 
      reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    
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
    this.product.tags = tagsString;
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}
}
