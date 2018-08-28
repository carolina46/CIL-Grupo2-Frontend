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
import { CompositeCommentFilter } from '../model/filter/CompositeCommentFilter';
import { UsersService } from '../users.service';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { UserSession } from '../model/users/user-session';
import {Router} from '@angular/router';
import { Responsible } from '../model/users/responsible';

@Component({
  selector: 'app-form-restaurant',
  templateUrl: './form-restaurant.component.html',
  styleUrls: ['./form-restaurant.component.scss']
})
export class FormRestaurantComponent implements OnInit {

  userSession : UserSession;
  restaurant: Restaurant; // The restaurant to be saved
  category: Category; // The chosen category which will be assigned to the restaurant
  location: Location; // The chosen location which will be assigned to the restaurant
  categories: Category[]; // List of categories to choose from
  //Comment Filters
  visitor : boolean;
  comensal : boolean;
  gourmet : boolean;

  constructor(private restaurantQueryService: RestaurantQueryService,
              private localStorage : LocalStorageServiceService,
              private userService : UsersService,
              private router : Router) { }

  ngOnInit() {
    this.userSession = this.localStorage.getUserFromLocalStorage();
    if (this.userSession == null)  this.router.navigate(['/principal']);
    else
      if(this.userSession.rol != "Responsible") this.router.navigate(['/principal']);
      else{
      this.restaurant = new Restaurant();
      this.category = new Category();
      this.location = new Location();
      this.restaurantQueryService.getCategories().subscribe(categories => this.categories = categories);
      this.visitor = false;
      this.comensal = false;
      this.gourmet = false;
      }    
  }

  addRestaurant(): void {
    this.restaurant.category = this.category;
    this.restaurant.location = this.location;
    this.getCommentFiltersSelected();
    let user = new Responsible();
    user.oid = this.userSession.oid;
    user.restaurants = [];
    user.restaurants.push(this.restaurant);
    this.userService.addRestaurant(user).subscribe(res=> console.log("volvi"));

  }

  getCommentFiltersSelected(){
    var composite = new CompositeCommentFilter();
    composite.configurationFilters = [];
    if(this.visitor) composite.configurationFilters.push(new VisitorCommentFilter);
    if(this.comensal) composite.configurationFilters.push(new ComensalCommentFilter);
    if(this.gourmet) composite.configurationFilters.push(new GourmetCommentFilter);

    if(composite.configurationFilters.length == 0) this.restaurant.commentFilter = new DenyCommentFilter;
    else
      if(composite.configurationFilters.length > 1) this.restaurant.commentFilter = composite;
      else this.restaurant.commentFilter = composite.configurationFilters[0];
  }
  
}
