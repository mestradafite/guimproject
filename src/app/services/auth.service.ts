import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";

import { UserInterface } from "../models/user-interface";
import { UserSettingsInterface } from "../models/user-settings-interface";
import { CampaignInterface } from "../models/campaign-interface";
import { ProductInterface } from "../models/product-interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private LOGIN_DEV = "http://localhost:3000/dev";
  private LOGIN_PROD = "https://90zdt80047.execute-api.us-east-1.amazonaws.com/dev";

  constructor(private htttp: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  loginuser(email: string, password: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/login";
    return this.htttp
      .post<UserInterface>(
        url_api,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  registerUser(username: string, email: string, password: string, sex: string, credits: string, influencer: boolean, brand: boolean): Observable<any> {
    const url_api = this.LOGIN_PROD + "/register";
    return this.htttp
      .post<UserInterface>(
        url_api,
        { username, email, password, sex, credits, influencer, brand },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  setUser(user: UserInterface): void {
    localStorage.removeItem("currentUser");
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }
  
  getToken() {
    return localStorage.getItem("accessToken");
  }

  setUserSettings(userSettings: UserSettingsInterface): void {
    let user_settings_string = localStorage.getItem("currentUserSettings");
    if (!isNullOrUndefined(user_settings_string)) {
      localStorage.removeItem("currentUserSettings");
    }
    user_settings_string = JSON.stringify(userSettings);
    localStorage.setItem("currentUserSettings", user_settings_string);
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  getUserById(userid: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/getuserbyuserid";
    return this.htttp
      .post<UserInterface>(
        url_api,
        { userid },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  setCurrentUserSettings(userid: string, boxlimit: string, price: string, locale: string, categories: string, tags: string, account: string, vacationMode: boolean): Observable<any> {
    const url_api = this.LOGIN_PROD + "/updateusersettings";
    return this.htttp
      .put<UserSettingsInterface>(
        url_api,
        { userid, boxlimit, price, locale, categories, tags, account, vacationMode },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  updateUser(userid: string, username: string, imageUrl: string, country: string, birthDay: string, userLocation: string, description: string, website: string, instagramUserName: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/updateuser";
    return this.htttp
      .put<UserSettingsInterface>(
        url_api,
        { userid, username, imageUrl, country, birthDay, userLocation, description, website, instagramUserName },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getCurrentUserSettings(): UserSettingsInterface {
    let user_string = localStorage.getItem("currentUserSettings");
    if (!isNullOrUndefined(user_string)) {
      let userSettings: UserSettingsInterface = JSON.parse(user_string);
      return userSettings;
    } else {
      return null;
    }
  }
  
  getUserSettings(userid: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/getusersettings";
    return this.htttp
      .post<UserInterface>(
        url_api,
        { userid },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getInfluencers(userid: string, username: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/getinfluencers";
    return this.htttp
      .post<UserInterface>(
        url_api,
        { userid, username },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  addCampaign(userid: string, product: ProductInterface, influencer: UserInterface, valoration: string, cState: string, canceled: boolean, message: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/insertcampaign";
    return this.htttp
      .post<CampaignInterface>(
        url_api,
        { userid, influencer, product, valoration, cState, canceled, message },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getCampaigns(userid: string, cState: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/getcampaignsbyuserid";
    return this.htttp
      .post<UserInterface>(
        url_api,
        { userid, cState },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getRequests(userid: string, cState: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/getcampaignsbyinfluencerid";
    return this.htttp
      .post<UserInterface>(
        url_api,
        { userid, cState },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  updateCampaign(campaignId: string, cState: string, canceled: boolean, message: string, options?: any): Observable<any> {
    const url_api = this.LOGIN_PROD + "/updatecampaign";
    return this.htttp
      .put<UserSettingsInterface>(
        url_api,
        { campaignId, cState, canceled, message, options },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    //const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserSettings");
    //return this.htttp.post<UserInterface>(url_api, { headers: this.headers });
  }
}