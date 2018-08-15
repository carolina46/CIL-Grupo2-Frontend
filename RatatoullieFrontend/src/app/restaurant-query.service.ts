/* This service will be responsible for providing operations such as
list and search for Restaurant, Menu, Dish and related classes.*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './model/business/category';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { ParentServiceService } from './parent-service.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantQueryService extends ParentServiceService {

  constructor(private http: HttpClient,
    messageService: MessageService) {
    super(messageService);
  }

  private categoriesGetURL = 'http://localhost:8080/Ratatoullie/category/listCategory';
  private categoryURL = ''; // TO BE IMPLEMENTED ON THE SERVER!

  // getCategories() {
  //   return this.http.get(this.categoriesGetURL);
  // }

  // Returns an Observable array of Categories, save in the log and handles error if any
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesGetURL).pipe(
        tap(categories => super.log('categories retrieved')),
        catchError(super.handleError('getCategories', []))
      );
  }

  /*getMenuTypes() {
    return this.http.get('http://localhost:8080/Ratatoullie/menuType/list').pipe(
      catchError(this.handleError('getMenuTypes', [])));
  }*/
  // CAROLINA CHECK IF THIS IS THE NEW METHOD


  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryURL}/${id}`;
    return this.http.get<Category>(url).pipe(
        tap(_ => super.log(`retrieved category with id=${id}`)),
        catchError(super.handleError<Category>(`getCategory id=${id}`))
      );
  }

  getMenuTypes() {
    return this.http.get('http://localhost:8080/Ratatoullie/menuType/listMenuType');
  }
}
