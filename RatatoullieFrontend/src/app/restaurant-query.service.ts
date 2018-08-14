/* This service will be responsible for providing operations such as 
list and search for Restaurant, Menu, Dish and related classes.*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantQueryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('http://localhost:8080/Ratatoullie/category/listCategory');
  }

  getMenuTypes() {
    return this.http.get('http://localhost:8080/Ratatoullie/menuType/listMenuType');
  }
}
