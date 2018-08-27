import { Component, OnInit } from '@angular/core';
import { MenuTypeService } from '../menu-type.service';
import { RestaurantQueryService } from '../restaurant-query.service';
import { Menu } from '../model/business/menu';
import { MenuType } from '../model/business/menu-type';
import { Tag } from '../model/business/tag';
import {Router, ActivatedRoute} from '@angular/router';
import { TagSelected } from '../model/business/tag-selected';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { Restaurant } from '../model/business/restaurant';



@Component({
  selector: 'app-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.scss']
})
export class MenuFormComponent implements OnInit {
  
  /* Represents the identification of the restaurant 
    to which we are going to add the new menu.
    We get it from the url */
  idRestaurant : number; 
  /*Restaurant to which we are going to add the new menu*/
  restaurant : Restaurant;
  /* List of menuTypes to show in the form. 
    We get it from the BD. */
  menuTypes: MenuType[];
  /* List of TagSelected to show in the form. 
    We got the list of Tags from BD and adapted it to be able to select it. */
  tags: TagSelected[];
  /*Variables that we use in the form to store 
    the information that the user enters */
  menu = new Menu();
  menuType = new MenuType();
  tagsSelecteds : Tag[];
   
  constructor(private menuTypeService : MenuTypeService, 
              private restaurantQueryService : RestaurantQueryService,
              private localStorage : LocalStorageServiceService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    /*
    //CONSULT USER ROL, MUST BE AN ADMINISTRATOR.
    let userSession = this.localStorage.getUserFromLocalStorage();
    if(userSession.rol != "Administrator") this.router.navigate(['/principal']);
    else{
      //We retrieve the parameter id of the restaurant.
      this.activatedRoute.params.subscribe( params => {
        this.idRestaurant = params['id'].toString();
        //CONSULT DB IF THE RESTAURANT EXISTS BEFORE CONTINUING.
        this.restaurantQueryService.getRestaurant(this.idRestaurant).subscribe(
          restaurant => { 
          if(restaurant == null) this.router.navigate(['/principal']);
            else{
              this.restaurant = restaurant;*/
              this.getMenuTypes();
              this.getTags();/*
            }});
      });
    }*/
  }


  getMenuTypes() : void {
    this.menuTypeService.getMenuTypes().subscribe(menuTypes => this.menuTypes = menuTypes);
  }

  getTags() : void {
    this.restaurantQueryService.getTags().subscribe(tags => {
      let listOfTags : TagSelected[] = [];
      tags.forEach(function (aTag) {listOfTags.push(new TagSelected(aTag));});
      this.tags=listOfTags;
    });
  }

  addMenu(){
   /*
    //Get the selected tags
    let listOfTags : Tag[] = [];
    this.tags.forEach(function(aTag){ if(aTag.selected) listOfTags.push(aTag.getTag());});
    this.tagsSelecteds = listOfTags;
    //Put together the new menu
    this.menu.type = this.menuType;
    this.menu.tags = this.tagsSelecteds;
    //We add the menu to the restaurant.
    this.restaurant.menus =[];
    this.restaurant.menus.push(this.menu);
    this.restaurantQueryService.saveMenu(this.restaurant); */
  }

}
