// This service will be responsible for providing operations such as Create, Delete, Modify for Restaurant, Menu, Dish and related classes
import { Injectable } from '@angular/core';
import { Category } from './model/business/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { NewRestaurant } from "./model/newRestaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantAdministrationService {

  private url = 'http://localhost:8080/Ratatoullie/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) {
   }

  /** POST: add a new Category to the server */
  addCategory (category: Category): Observable <Category> {
    const jsonCategory = JSON.stringify(category);
    return this.http.post<Category>(this.url + 'category/categoryForm', jsonCategory, this.httpOptions).pipe(
      tap((cat: Category) => this.log(`added category w/ id=${cat.oid}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }
  
  /** DELETE: deletes a  Category from the server */
  deleteCategory (category: Category): Observable<Boolean> {
    const id = category.oid;
    const url = `${this.url}category/delete/${id}`;
    return this.http.delete<Boolean>(url, this.httpOptions).pipe(
      tap(res => this.log(`deleted Category id=${id}`),
      catchError(this.handleError<Category>('deleteCategory'))));
  }

  /** PUT: updates a  Category in the server */
  updateCategory (category: Category): Observable<Boolean> {
    let body = JSON.stringify(category); 
    return this.http.put<Category>(this.url + 'category/update', body, this.httpOptions).pipe(
      tap(res=> this.log(`updated menuType id=${category.oid}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  // POST : add a new restaurant to the user
  addRestaurant(responsible : NewRestaurant): Observable<Boolean> {
    let url = this.url + "users/responsible/addRestaurant";
    let body = JSON.stringify(responsible); 
    return this.http.post<Boolean>(url, body, this.httpOptions).pipe(
       tap(res => this.log(`added restaurant`)),
       catchError(this.handleError<Boolean>('addRestaurant'))
    );
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
