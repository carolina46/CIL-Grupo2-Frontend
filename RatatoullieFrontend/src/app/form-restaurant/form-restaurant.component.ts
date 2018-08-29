import { Component, OnInit } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';
import { Restaurant } from "../model/business/restaurant";
import { Category } from '../model/business/category';
import { Location } from '../model/business/location';
import { DenyCommentFilter } from '../model/filter/deny_comment_filter';
import { VisitorCommentFilter } from '../model/filter/visitor_comment_filter';
import { ComensalCommentFilter } from '../model/filter/comensal_comment_filter';
import { GourmetCommentFilter } from '../model/filter/gourmet_comment_filter';
import { DenyNotificationFilter } from '../model/filter/deny_notification_filter';
import { VisitorNotificationFilter } from '../model/filter/visitor_notification_filter';
import { ComensalNotificationFilter } from '../model/filter/comensal_notification_filter';
import { GourmetNotificationFilter } from '../model/filter/gourmet_notification_filter';
import { CommentFilter } from "../model/filter/comment_filter";
import { NotificationFilter } from "../model/filter/notification_filter";
import { CompositeCommentFilter } from '../model/filter/composite_comment_filter';
import { UsersService } from '../users.service';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { UserSession } from '../model/users/user-session';
import {Router} from '@angular/router';
import { Responsible } from '../model/users/responsible';
import { NewRestaurant } from '../model/newRestaurant';
import { RestaurantAdministrationService } from "../restaurant-administration.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-form-restaurant',
  templateUrl: './form-restaurant.component.html',
  styleUrls: ['./form-restaurant.component.scss']
})
export class FormRestaurantComponent implements OnInit {

  userSession : UserSession; //The logged user
  newRestaurant : NewRestaurant; // The restaurant to be saved
  categories: Category[]; // List of categories to choose from
  
  constructor(private restaurantQueryService: RestaurantQueryService,
              private restaurantAdministrationService: RestaurantAdministrationService,
              private messageService: MessageService,
              private localStorage : LocalStorageServiceService,
              private userService : UsersService,
              private router : Router) { }

  ngOnInit() {
    this.userSession = this.localStorage.getUserFromLocalStorage();
    if (this.userSession == null){
      this.messageService.add("ERROR: El usuario no se encuentra logueado  hubo un error al recuperar la sesión de usuario..");
      this.router.navigate(['/principal']);
    }else
      if(this.userSession.rol != "Responsible"){
        this.messageService.add("ERROR: El usuario no tiene permisos para agregar un Restaurant..");
        this.router.navigate(['/principal']);
      }else{
        this.restaurantQueryService.getCategories().subscribe(categories => this.categories = categories);
        this.newRestaurant = new NewRestaurant();
        this.newRestaurant.responsible = this.userSession.oid;
        this.newRestaurant.visitor = false;
        this.newRestaurant.comensal = false;
        this.newRestaurant.gourmet = false;
      }    
  }

  addRestaurant(): void {
    this.restaurantAdministrationService.addRestaurant(this.newRestaurant).subscribe(_=>  window.history.back());
  }
  
}
