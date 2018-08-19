// This service will be responsible for providing operations such as Create, Delete, Modify for Restaurant, Menu, Dish and related classes
import { Injectable } from '@angular/core';
import { Category } from './model/business/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { MenuType } from './model/business/menu-type';

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

  /** POST: add a new MenuType to the server */
  saveMenuType(menuType: MenuType): Observable<MenuType> {
   const body = JSON.stringify(menuType);
    return this.http.post<MenuType>(this.url + 'menuType/save', body, this.httpOptions).pipe(
      tap((mt: MenuType) => this.log(`added MenuType w/ id=${mt.oid}`)),
      catchError(this.handleError<MenuType>('addMenuType'))
    );
  }

  /** DELETE: deletes a  MenuType from the server */
  deleteMenuType (menuType: MenuType): Observable<MenuType> {
    const id = typeof menuType.oid;
    const url = `${this.url}/menuType/delete/${id}`;
    return this.http.delete<MenuType>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted MenuType id=${id}`)),
      catchError(this.handleError<MenuType>('deleteMenuType'))
    );
  }

  /** PUT: updates a  MenuType in the server */
  updateMenuType (menuType: MenuType): Observable<any> {
    return this.http.put(this.url + 'menuType/update', menuType, this.httpOptions).pipe(
      tap(_ => this.log(`updated menuType id=${menuType.oid}`)),
      catchError(this.handleError<any>('updateHero'))
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
