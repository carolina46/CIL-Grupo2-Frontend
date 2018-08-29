import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Menu } from '../model/business/menu';
import { RestaurantQueryService } from '../restaurant-query.service';
import { UserSession } from '../model/users/user-session';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { Restaurant } from '../model/business/restaurant';

@Component({
  selector: 'app-my-restaurant',
  templateUrl: './my-restaurant.component.html',
  styleUrls: ['./my-restaurant.component.scss']
})
export class MyRestaurantComponent implements OnInit {

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private localStorage : LocalStorageServiceService,
              private restaurantQueryService: RestaurantQueryService) { }

  /* The logged user */
  userSession : UserSession; 
  /* The id of the restaurant that we are going to show. We get it from the url */
  idRestaurant : number;
  /* The restaurant and its menus. We get it from the bd */
  restaurant : Restaurant;


  ngOnInit() {
    /* We check if a user is logged in */ 
    this.userSession = this.localStorage.getUserFromLocalStorage();
    if (this.userSession == null)  this.router.navigate(['/principal']);
    else
      /* We check if the user has a responsible role */
      if(this.userSession.role != "Responsible") this.router.navigate(['/principal']);
      else{
        /* we get the data to show from the bd */
        this.restaurant = new Restaurant();
        this.restaurant.menus = [];
        this.activatedRoute.params.subscribe( params => { this.idRestaurant = params['id'].toString();});
        this.restaurantQueryService.getRestaurant(this.idRestaurant).subscribe(restaurant=> {this.restaurant=restaurant;});  
      }

  }

}
