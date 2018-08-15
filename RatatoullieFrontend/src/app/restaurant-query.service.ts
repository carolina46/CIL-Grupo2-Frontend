/* This service will be responsible for providing operations such as
list and search for Restaurant, Menu, Dish and related classes.*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './model/business/category';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantQueryService {

  constructor(private http: HttpClient,
    private messageService: MessageService) {
  }

  private categoriesGetURL = 'http://localhost:8080/Ratatoullie/category/listCategory';
  private categoryURL = ''; // TO BE IMPLEMENTED ON THE SERVER!

  // Returns an Observable array of Categories, save in the log and handles error if any
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesGetURL).pipe(
        tap(categories => this.log('categories retrieved')),
        catchError(this.handleError('getCategories', []))
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
        tap(_ => this.log(`retrieved category with id=${id}`)),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  getMenuTypes() {
    return this.http.get('http://localhost:8080/Ratatoullie/menuType/listMenuType');
  }

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
