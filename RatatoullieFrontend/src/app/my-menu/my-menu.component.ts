import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { RestaurantQueryService } from '../restaurant-query.service';
import { UserSession } from '../model/users/user-session';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { Restaurant } from '../model/business/restaurant';
import { Menu } from '../model/business/menu';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss']
})
export class MyMenuComponent implements OnInit {

  /* The logged user */
  userSession : UserSession; 
  /* The id of the restaurant. We get it from the url */
  idRestaurant : number;
  /* The id of the menu that we are going to show. We get it from the url */
  idMenu : number;
  /* The restaurant and its menus. We get it from the bd */
  restaurant : Restaurant;
  menu : Menu;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private localStorage : LocalStorageServiceService,
              private restaurantQueryService: RestaurantQueryService) { }

  ngOnInit() {
      /* We check if a user is logged in */ 
      this.userSession = this.localStorage.getUserFromLocalStorage();
      if (this.userSession == null)  this.router.navigate(['/principal']);
      else
        /* We check if the user has a responsible role */
        if(this.userSession.role != "Responsible") this.router.navigate(['/principal']);
        else{
            this.activatedRoute.params.subscribe( params => {
                this.idRestaurant = params['idR'].toString();
                this.idMenu = params['idM'].toString();
                this.restaurantQueryService.getRestaurant(this.idRestaurant).subscribe(restaurant=> {
                    if(restaurant == null)  this.router.navigate(['/principal']);
                    else{
                      this.restaurant = restaurant;
                      //Look for the menu with oid = idMenu
                      let menus = restaurant.menus.filter(m => m.oid !== this.idMenu);
                      if(menus.length == 0) this.router.navigate(['/principal']);
                      else  this.menu = menus[0];
                    }
                });  
            });
        }
  }

  goBack(){
    window.history.back();
  }


}
