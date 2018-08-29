import { Component, OnInit } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Dish } from '../model/business/dish';
import { TagSelected } from '../model/business/tag-selected';
import { Tag } from '../model/business/tag';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { Menu } from '../model/business/menu';

@Component({
  selector: 'app-form-dish',
  templateUrl: './form-dish.component.html',
  styleUrls: ['./form-dish.component.scss']
})
export class DishFormComponent implements OnInit {

  /* Represents the identification of the restaurant and menu
    to which we are going to add the new menu.
    We get it from the url */
  idRestaurant : number; 
  idMenu : number;
  /* List of TagSelected to show in the form. 
  We got the list of Tags from BD and adapted it to be able to select it. */
  tags: TagSelected[];
  /*Variables that we use in the form to store 
    the information that the user enters */
  menu : Menu;
  dish : Dish;
  
  
  constructor(private restaurantQueryService : RestaurantQueryService,
              private localStorage : LocalStorageServiceService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
      //CONSULT USER ROL, MUST BE AN RESPONSIBLE.
      let userSession = this.localStorage.getUserFromLocalStorage();
      if(userSession.role != "Responsible") this.router.navigate(['/principal']);
      else
          //We retrieve the parameter idRestaurant and idMenu.
          this.activatedRoute.params.subscribe( params => {
              this.idRestaurant = params['idR'].toString();
              this.idMenu = params['idM'].toString();
              //CONSULT DB IF THE RESTAURANT EXISTS BEFORE CONTINUING.*/
              this.restaurantQueryService.getRestaurant(this.idRestaurant).subscribe(restaurant => {
                  if(restaurant == null) this.router.navigate(['/principal']);
                  else{
                      //Look for the menu with oid = idMenu
                      let menus = restaurant.menus.filter(m => m.oid !== this.idMenu);
                      if(menus.length == 0) this.router.navigate(['/principal']);
                      else{
                        this.dish = new Dish();
                        this.menu = menus[0];
                        this.tags = [];
                        this.getTags();
                      }
                      
                  }
              });
          
          });
    }


  getTags(): void {
    this.restaurantQueryService.getTags().subscribe(tags => {
      let listOfTags : TagSelected[] = [];
      tags.forEach(function (aTag) {listOfTags.push(new TagSelected(aTag));});
      this.tags=listOfTags;
    });
  }

  addDish(){
    //Get the selected tags
    let listOfTags : Tag[] = [];
    this.tags.forEach(function(aTag){ if(aTag.selected) listOfTags.push(aTag.getTag());});
    this.dish.tags = listOfTags;
    //Add the dish to the Menu
    this.menu.dishes.push(this.dish);
    this.restaurantQueryService.saveDish(this.menu).subscribe(_=>  window.history.back()); 

  }

  detectFiles(event) {
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = (e: any) => { this.dish.picture = e.target.result;}
      reader.readAsDataURL(file);
    }
  }
    


}
