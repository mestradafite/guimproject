import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardProducts implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    if (this.authService.getCurrentUser()) {
      // login TRUE
      return true;
    } else {
      this.router.navigate(['/brand-signup']);
      return false;
    }
  }
}