import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule} from '@angular/common/http';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { PreSignupComponent } from './signup/pre-signup/pre-signup.component';
import { BrandSignupComponent } from './signup/brand-signup/brand-signup.component';
import { InfluencerSignupComponent } from './signup/influencer-signup/influencer-signup.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SendProductComponent } from './products/send-product/send-product.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { BrandProfileComponent } from './brand-profile/brand-profile.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SettingsComponent } from './settings/settings.component';
import { NgbdModalContent } from './shared/creditmodal/modal';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { InfluencerProfileComponent } from './influencer-profile/influencer-profile.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    PreSignupComponent,
    BrandSignupComponent,
    InfluencerSignupComponent,
    SendProductComponent,
    NewProductComponent,
    BrandProfileComponent,
    SettingsComponent,
    NgbdModalContent,
    EditProfileComponent,
    EditBrandComponent,
    InfluencerProfileComponent,
    InfluencersComponent,
    CampaignsComponent,
    RequestsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    NgxSpinnerModule,
    IvyCarouselModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
