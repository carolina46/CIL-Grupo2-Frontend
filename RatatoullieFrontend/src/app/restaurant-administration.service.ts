// This service will be responsible for providing operations such as Create, Delete, Modify for Restaurant, Menu, Dish and related classes
import { Injectable } from '@angular/core';
import { Category } from './model/business/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

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
