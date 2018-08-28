import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from './model/users/login';
import { MessageService } from './message.service';
import { Signin } from './model/users/signin';
import { Restaurant } from './model/business/restaurant';
import { UserSession } from './model/users/user-session';
import { Responsible } from './model/users/responsible';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:8080/Ratatoullie/';
  private header = ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })});

  constructor(private http: HttpClient, private messageService: MessageService) { }


  /** GET : Find out if the user exist */
  checkUser (signin : Signin) :  Observable<Boolean> {
    const user = signin.user;
    const url = `${this.url}users/checkUser/${user}`;
    return this.http.get<Boolean>(url, this.header).pipe(
      tap(res => this.log(`Check user=${user}`),
      catchError(this.handleError<Boolean>('Check user'))));
  }

 /** POST : add a new user to the server */
 saveUser (signin : Signin, responsible : Boolean) :  Observable<Boolean> {
  let url = ( responsible.toString() == "true" ? 'users/saveResponsible' : 'users/saveNormal' );
  console.log(url);
  let body = JSON.stringify(signin); 
  return this.http.post<Boolean>(this.url + url, body, this.header).pipe(
     tap(res => this.log(`added User ${signin.user}`)),
     catchError(this.handleError<Boolean>('addUser'))
   );
 }

 /** POST :  Check if user and password are correct and get the userSession */
 login (login : Login) : Observable<UserSession>{
   let body = JSON.stringify(login);
   return this.http.post<UserSession>(this.url + 'users/login', body , this.header ).pipe(
    tap(userSession => this.log(`Login User ${login.user}`)),
    catchError(this.handleError<UserSession>('Login User'))
    );
 }

 // ------- RESTAURAT METHODS -------------
  // GET : get a list of restaurant from the server
  getMyRestaurants(userSession : UserSession): Observable<Restaurant[]> {
    const url = `${this.url}users/myRestaurants/${userSession.oid}`;
    return this.http.get<Restaurant[]>(url)
      .pipe(tap(restaurants => this.log('restaurants retrieved')),
      catchError(this.handleError('getMyRestaurants', [])));
  }

  // POST : add a new restaurant to the user
  addRestaurant(responsible : Responsible): Observable<Boolean> {
    let url = this.url + "users/responsible/addRestaurant";
    console.log(url);
    let body = JSON.stringify(responsible); 
    return this.http.post<Boolean>(url, body, this.header).pipe(
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
