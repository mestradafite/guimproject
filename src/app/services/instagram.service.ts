import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { UserSettingsInterface } from "../models/user-settings-interface";

@Injectable({
  providedIn: "root"
})
export class InstagramService {

  private LOGIN_DEV = "http://localhost:3000/dev";
  private LOGIN_PROD = "https://bm2mpbw6tc.execute-api.us-east-1.amazonaws.com/dev";

  constructor(private htttp: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });


  getInstagramInfoByUsername(username: string): Observable<any> {
    //const url_api = this.LOGIN_PROD + "/getfollowers";
    const url_api = "https://www.instagram.com/" + username + "/?__a=1";
    return this.htttp
      .get(url_api)
      .pipe(map(data => data));
  }
}