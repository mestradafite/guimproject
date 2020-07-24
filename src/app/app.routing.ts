import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { PreSignupComponent } from './signup/pre-signup/pre-signup.component';
import { BrandSignupComponent } from './signup/brand-signup/brand-signup.component';
import { InfluencerSignupComponent } from './signup/influencer-signup/influencer-signup.component';
import { SendProductComponent } from './products/send-product/send-product.component'
//import { Page404Component } from 'src/app/components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardProducts } from './guards/auth.guard_products';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'pre-signup',     component: PreSignupComponent },
    { path: 'brand-signup',     component: BrandSignupComponent },
    { path: 'influencer-signup',     component: InfluencerSignupComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'send-product',          component: SendProductComponent, canActivate: [AuthGuardProducts] },
    //{ path: '**', component: Page404Component },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
