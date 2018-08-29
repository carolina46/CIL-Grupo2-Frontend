/* This service will be responsible for providing operations such as
list and search for Restaurant, Menu, Dish and related classes.*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Category } from './model/business/category';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Tag } from './model/business/tag';
import { TagSelected } from './model/business/tag-selected';
import { NotificationFilter } from "./model/filter/notification_filter";
import { CommentFilter } from "./model/filter/comment_filter";
import { Restaurant } from './model/business/restaurant';
import { NewMenu } from './model/NewMenu';

@Injectable({
  providedIn: 'root'
})
export class RestaurantQueryService {

  private header = ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })});

  constructor(private http: HttpClient, private messageService: MessageService) {  }

  private url = 'http://localhost:8080/Ratatoullie/';


  // GET : Rretrieves the restaurant with certain id
  getRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.url}restaurant/get/${id}`;
    return this.http.get<Restaurant>(url).pipe(
        tap(_ => this.log(`retrieved Restaurant with id=${id}`)),
        catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
      );
  }


  // POST : Add a new menu to the restaurant
  saveMenu(newMenu : NewMenu): Observable<Boolean> {
    let body = JSON.stringify(newMenu); 
    let url = `${this.url}restaurant/saveMenu`;
    return this.http.post<Boolean>(url, body, this.header).pipe(
      tap(_ => this.log(`save Menu`)),
      catchError(this.handleError<Boolean>('save Menu'))
    );
  }







  
// POST : Add a new restaurant
saveRestaurant(restaurant: Restaurant) {
  let body = JSON.stringify(restaurant); 
  const url = this.url + 'restaurant/savedRestaurant';
  this.http.post(url, body, this.header).pipe(
     tap(_ => this.log(`save restaurant`)),
     catchError(this.handleError ('save restaurant error'))
   );
}












  // ------CATEGORY METHODS -------
  // Returns an Observable array of Categories, save in the log and handles error if any
  getCategories(): Observable<Category[]> {
    const url = this.url + 'category/listCategory';
    return this.http.get<Category[]>(url).pipe(
        tap(_ => this.log('categories retrieved')),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.url}getCategory/${id}`;
    return this.http.get<Category>(url).pipe(
        tap(_ => this.log(`retrieved category with id=${id}`)),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  // ------TAG METHODS -------
    getTags(): Observable<Tag[]> {
      return this.http.get<Tag[]>(this.url + 'tag/list')
        .pipe(tap(tag => this.log('tag retrieved')),
        catchError(this.handleError('getTags', [])));
  }

  getNotificationFilters(): Observable<NotificationFilter[]> {
    const url = this.url + 'restaurant/getNotificationFilters';
    return this.http.get<NotificationFilter[]>(url).pipe(
      tap(_ => this.log('retrieved list of notification filters')),
      catchError(this.handleError('getNotificationFilters', []))
      );
  }
  
  getCommentFilters(): Observable<CommentFilter[]> {
    const url = this.url + 'restaurant/getCommentFilters';
    return this.http.get<CommentFilter[]>(url).pipe(
      tap(_ => this.log('retrieved list of comment filters')),
      catchError(this.handleError('getCommentFilters', []))
      );
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
