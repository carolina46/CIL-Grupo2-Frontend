/* This service will be responsible for providing operations such as
list and search for Restaurant, Menu, Dish and related classes.*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Category } from './model/business/category';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { MenuType } from './model/business/menu-type';
import { Tag } from './model/business/tag';

@Injectable({
  providedIn: 'root'
})
export class RestaurantQueryService {

  private url = 'http://localhost:8080/Ratatoullie/';
  private header = ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })});

  constructor(private http: HttpClient, private messageService: MessageService) {  }

  private categoriesGetURL = 'http://localhost:8080/Ratatoullie/category/listCategory';
  private categoryURL = ''; // TO BE IMPLEMENTED ON THE SERVER!


  // ------CATEGORY METHODS -------
  // Returns an Observable array of Categories, save in the log and handles error if any
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesGetURL).pipe(
        tap(categories => this.log('categories retrieved')),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryURL}/${id}`;
    return this.http.get<Category>(url).pipe(
        tap(_ => this.log(`retrieved category with id=${id}`)),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  // ------MENU TYPE METHODS -------
  getMenuTypes(): Observable<MenuType[]> {
    return this.http.get<MenuType[]>('http://localhost:8080/Ratatoullie/menuType/list')
      .pipe(tap(menuType => this.log('menuTypes retrieved')),
      catchError(this.handleError('getMenuTypes', [])));
  }

  saveMenuType(menuType: MenuType): Observable<MenuType>{
   let body = JSON.stringify(menuType); 
    return this.http.post<MenuType>(this.url + 'menuType/save', body, this.header).pipe(
      tap((menuType: MenuType) => this.log(`added MenuType w/ id=${menuType.oid}`)),
      catchError(this.handleError<MenuType>('addMenuType'))
    );
  }

  deleteMenuType (menuType: MenuType): Observable<Boolean> {
    const id = menuType.oid;
    const url = `${this.url}menuType/delete/${id}`;
    return this.http.delete<Boolean>(url, this.header).pipe(
      tap(res => this.log(`deleted MenuType id=${id}`),
      catchError(this.handleError<MenuType>('deleteMenuType'))));
  }

  updateMenuType (menuType: MenuType): Observable<Boolean> {
    let body = JSON.stringify(menuType); 
    return this.http.put<MenuType>(this.url + 'menuType/update', body, this.header).pipe(
      tap(res=> this.log(`updated menuType id=${menuType.oid}`)),
      catchError(this.handleError<any>('updateMenuType'))
    );
  }


    // ------TAG METHODS -------
    getTags(): Observable<Tag[]> {
      return this.http.get<Tag[]>(this.url + '/tag/list')
        .pipe(tap(tag => this.log('tag retrieved')),
        catchError(this.handleError('getTags', [])));
    }


  // ------HandleError METHODS -------
  // Send the message log to the Message Service
  protected log(message: string) {
    this.messageService.add(`RestaurantQueryService: ${message}`); // Note the special quotation marks
  }

  /**
 * Handle Http operation that failed. Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  protected handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
