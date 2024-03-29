import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input()
  public alerts: Array<IAlert> = [];
  private alertVisible: boolean; 
  private countries: string[] = ["España", "UK", "USA"];
  private selectedCountry: string = "Escoge una opción...";
  public imgURL: any;
  private selectedFile: File = null;
  private closeResult: string;
  private alertErrorVisible: boolean;
  private PRODUCTO_PROD = "https://90zdt80047.execute-api.us-east-1.amazonaws.com/dev";
  private username: string = "";


  private user: UserInterface = {
    id: "",
    username: "",
    country: "",
    userLocation: "",
    imageUrl: "",
    description: "",
    birthDay: "",
    userToken: "",
    instagramUserName: "" 
}

  constructor(private authService: AuthService, private modalService: NgbModal, private spinner: NgxSpinnerService) {
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
      strong: 'Atención!',
      message: 'Para continuar debes rellenar toda la información...',
      icon: 'ni ni-support-16'
  });
   }
  @ViewChild('noImage') 
  private content: TemplateRef<any>;

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if(this.user.username =="" || this.user.birthDay == "" || this.user.country=="" || this.user.imageUrl ==""){
      this.alertVisible = true;
    }
    this.formatUserName();
    if(this.user.country){
      this.selectedCountry = this.user.country;
    }
    if(this.user.imageUrl) this.imgURL = this.user.imageUrl;
  }

  updateUser(){
    this.spinner.show();
    if(this.authService.getCurrentUser()){
      this.uploadImage();
    }
  }

  uploadImage(){
    if(this.selectedFile) this.getURLImage(this.selectedFile); 
    else this.updateUserInfo();
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
      self.user.imageUrl = imageURL;
      self.updateUserInfo();
    });
  }

  formatUserName(){
    var splitted = this.user.username.split(" "); 
    for (let i = 0; i < splitted.length; i++) {
        this.username += splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1).toLowerCase() + " ";
    }
    this.user.username = this.username;
  }

  updateUserInfo(){
    console.log(this.user.instagramUserName);
    
    this.authService.updateUser(this.authService.getCurrentUser().id, this.user.username.toLocaleLowerCase(), this.user.imageUrl, this.user.country, 
                                              this.user.birthDay, this.user.userLocation, this.user.description, this.user.website, this.user.instagramUserName)
    .subscribe(data => {
      console.log("User Submited!");
      this.authService.setUser(this.user);
      this.spinner.hide();
      window.location.reload();
    },
    error => {
      this.alertErrorVisible = true;
      console.log(error);
    });
  }

  changeCountry(country: string){
    this.selectedCountry = country;
    this.user.country = this.selectedCountry;
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
