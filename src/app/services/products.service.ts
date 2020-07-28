import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

import { ProductInterface } from "../models/product-interface";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private LOGIN_DEV = "http://localhost:3000/dev";
  private LOGIN_PROD = "https://fjdpswr5d2.execute-api.us-east-1.amazonaws.com/dev";

  constructor(private htttp: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  insertproduct(userid: string, urlimages: string, name: string, category: string, tags: string, url:string, sizes:string, price: string, description:string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/insertproduct";
    return this.htttp
      .post<ProductInterface>(
        url_api,
        { userid, urlimages, name, category, tags, url, sizes, price, description },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getUserProducts(userid: string): Observable<any> {
    const url_api = this.LOGIN_PROD + "/getproductsbyuserid";
    return this.htttp
      .post<ProductInterface>(
        url_api,
        { userid },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

}
