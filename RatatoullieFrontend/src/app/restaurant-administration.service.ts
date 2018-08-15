// This service will be responsible for providing operations such as Create, Delete, Modify for Restaurant, Menu, Dish and related classes
import { Injectable } from '@angular/core';
import { Category } from './model/business/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ParentServiceService } from './parent-service.service';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantAdministrationService extends ParentServiceService {

  private categoryPostURL = 'http://localhost:8080/Ratatoullie/category/categoryForm';

  constructor(private http: HttpClient,
    messageService: MessageService) {
      super(messageService);
   }

  /** POST: add a new category to the server */
  addCategory (category: Category): Observable <Category> {
    return this.http.post<Category>(this.categoryPostURL, category, httpOptions).pipe(
      tap((category: Category) => super.log(`added category w/ id=${category.id}`)),
      catchError(super.handleError<Category>('addCategory'))
    );
  }


}
