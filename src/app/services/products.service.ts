import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

import { ProductInterface } from "../models/product-interface";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private PRODUCTO_DEV = "http://localhost:3000/dev";
  private PRODUCTO_PROD = "https://90zdt80047.execute-api.us-east-1.amazonaws.com/dev";

  constructor(private htttp: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  insertproduct(userid: string, urlimages: string[], name: string, category: string, tags: string, url:string, sizes:string, description:string): Observable<any> {
    const url_api = this.PRODUCTO_PROD + "/insertproduct";
    return this.htttp
      .post<ProductInterface>(
        url_api,
        { userid, urlimages, name, category, tags, url, sizes, description },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getUserProducts(userid: string): Observable<any> {
    const url_api = this.PRODUCTO_PROD + "/getproductsbyuserid";
    return this.htttp
      .post<ProductInterface>(
        url_api,
        { userid },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getProductById(productId: string): Observable<any> {
    const url_api = this.PRODUCTO_PROD + "/getproductbyid";
    return this.htttp
      .post<ProductInterface>(
        url_api,
        { productId },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getCategories(): Observable<any> {
    const url_api = this.PRODUCTO_PROD + "/getcategories";
    return this.htttp
      .get(
        url_api,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getTags(): Observable<any> {
    const url_api = this.PRODUCTO_PROD + "/gettags";
    return this.htttp
      .get(
        url_api,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }
}
