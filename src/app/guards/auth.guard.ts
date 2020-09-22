import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userValid = false;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    console.log(this.authService.getCurrentUser());
    
    if (this.authService.getCurrentUser()) {
      console.log(this.authService.getCurrentUser());
      if(this.authService.getCurrentUser().influencer == true) this.checkInfoInfluencer();
      else this.checkInfoBrand();
      
      // login TRUE
      return this.userValid;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  checkInfoInfluencer(){    
    if(this.authService.getCurrentUser().birthDay != "" && this.authService.getCurrentUser().country!="" && this.authService.getCurrentUser().imageUrl !=""){
      this.userValid = true;
    }else{
      this.router.navigate(['/edit-profile']);
    }
  }

  checkInfoBrand(){    
    if( this.authService.getCurrentUser().country!="" && this.authService.getCurrentUser().imageUrl !="" && this.authService.getCurrentUser().website && this.authService.getCurrentUser().description){
      this.userValid = true;
    }else{
      this.router.navigate(['/edit-brand']);
    }
  }
}