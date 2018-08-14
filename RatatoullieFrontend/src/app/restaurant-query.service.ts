// This service will be responsible for providing operations such as list and search for Restaurant, Menu, Dish and related classes
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './model/business/category';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantQueryService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private categoriesURL = 'http://localhost:8080/Ratatoullie/category/listCategory';
  private categoryURL = ''; // TO BE IMPLEMENTED ON THE SERVER!

  getCategories() {
    return this.http.get(this.categoriesURL);
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryURL}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(_ => this.log(`retrieved category with id=${id}`)),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  // Send the message log to the Message Service
  private log(message: string) {
    this.messageService.add(`RestaurantQueryService: ${message}`); // Notar que usa comillas especiales para que funcione
  }

  /**
 * Handle Http operation that failed. Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
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
