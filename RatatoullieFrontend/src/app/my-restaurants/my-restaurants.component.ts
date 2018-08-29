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
    let userSession = this.localStorage.getUserFromLocalStorage();
    if(userSession.role != "Responsible") this.router.navigate(['/principal']);
    else this.getRestaurants(userSession);
  }

  getRestaurants( userSession : UserSession){
    this.usersService.getMyRestaurants(userSession).subscribe(restaurants => this.restaurants = restaurants);
  }

}
