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
import { SendProductComponent } from './products/send-product/send-product.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { BrandProfileComponent } from './brand-profile/brand-profile.component';
//import { Page404Component } from 'src/app/components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { InfluencerProfileComponent } from './influencer-profile/influencer-profile.component';
import { InfluencersComponent } from './influencers/influencers.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'brand-profile',     component: BrandProfileComponent, canActivate: [AuthGuard] },
    { path: 'pre-signup',     component: PreSignupComponent },
    { path: 'brand-signup',     component: BrandSignupComponent },
    { path: 'influencer-signup',     component: InfluencerSignupComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'new-product',          component: NewProductComponent },
    { path: 'send-product',          component: SendProductComponent, canActivate: [AuthGuard] },
    { path: 'settings',          component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile',          component: EditProfileComponent },
    { path: 'edit-brand',          component: EditBrandComponent },
    { path: 'influencer-profile',          component: InfluencerProfileComponent },
    { path: 'influencers',          component: InfluencersComponent },
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
