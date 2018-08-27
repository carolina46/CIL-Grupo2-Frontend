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

@Component({
  selector: 'app-form-restaurant',
  templateUrl: './form-restaurant.component.html',
  styleUrls: ['./form-restaurant.component.scss']
})
export class FormRestaurantComponent implements OnInit {

  restaurant: Restaurant; // The restaurant to be saved
  categories: Category[]; // List of categories to choose from
  category: Category; // The chosen category which will be assigned to the restaurant
  location: Location; // The chosen location which will be assigned to the restaurant
    
  submited: boolean; // To control that the name field contains something

  //Comment Filters
  denyCommentFilter: DenyCommentFilter;
  visitorCommentFiler: VisitorCommentFilter;
  comensalComentFilter: ComensalCommentFilter;
  gourmetCommentFilter: GourmetCommentFilter;

  //Notification Filters
  denyNotificationFilter: DenyNotificationFilter;
  visitorNotificationFiler: VisitorNotificationFilter;
  comensalNotificationFilter: ComensalNotificationFilter;
  gourmetNotificationFilter: GourmetNotificationFilter;

  commentFilters: CommentFilter[];
  notificationFilters: NotificationFilter[];

  constructor(private restaurantQueryService: RestaurantQueryService) { }

  ngOnInit() {
    this.restaurant = new Restaurant();
    this.category = new Category();
    this.location = new Location();
    this.restaurantQueryService.getCategories().subscribe(categories => this.categories = categories);
    this.restaurantQueryService.getCommentFilters().subscribe(commentFilters => this.commentFilters = commentFilters);
    this.restaurantQueryService.getNotificationFilters().subscribe(notificationFilters => this.notificationFilters = notificationFilters);
    this.submited = false; // Did not press the add button
  }

  addRestaurant(): void {
    if (this.restaurant.name.length == 0) { 
        this.submited = true; // Press the add button but the field name is empty
    }
    //this.restaurantAdministrationService.addCategory(this.category)
    //.subscribe(cat => this.categories.push(cat));
  }
  
}
