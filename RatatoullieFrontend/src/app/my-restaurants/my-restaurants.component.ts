import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UsersService } from '../users.service';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { UserSession } from '../model/users/user-session';
import { Restaurant } from '../model/business/restaurant';
import { Category } from '../model/business/category';

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.scss']
})
export class MyRestaurantsComponent implements OnInit {

  constructor(private usersService : UsersService,
              private localStorage : LocalStorageServiceService,
              private router : Router) { }

  restaurants : Restaurant[];

  

  ngOnInit() {
   /* let userSession = this.localStorage.getUserFromLocalStorage();
    if(userSession.rol != "Administrator") this.router.navigate(['/principal']);
    else this.getRestaurants(userSession);*/

    this.initRestaurants();


  }


initRestaurants(){
  this.restaurants = [];

  let r1 : Restaurant = new Restaurant();
  r1.oid = 1;
  r1.name = "restaurant 1"
  r1.category = new Category();
  r1.category.name = "categoria 1"

  let r2 : Restaurant = new Restaurant();
  r2.oid = 2;
  r2.name = "restaurant 2"
  r2.category = new Category();
  r2.category.name = "categoria 2"

  let r3 : Restaurant = new Restaurant();
  r3.oid = 3;
  r3.name = "restaurant 3"
  r3.category = new Category();
  r3.category.name = "categoria 3"
  
  this.restaurants.push(r1);
  this.restaurants.push(r2);
  this.restaurants.push(r3);
}


getRestaurants( userSession : UserSession){
  this.usersService.getMyRestaurants(userSession).subscribe(restaurants => this.restaurants = restaurants);
}

}
