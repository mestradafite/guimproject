import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule} from '@angular/common/http';

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
    BrandProfileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
