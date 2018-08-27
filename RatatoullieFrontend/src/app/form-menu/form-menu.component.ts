import { Component, OnInit } from '@angular/core';
import { MenuTypeService } from '../menu-type.service';
import { RestaurantQueryService } from '../restaurant-query.service';
import { Menu } from '../model/business/menu';
import { MenuType } from '../model/business/menu-type';
import { Tag } from '../model/business/tag';
import {Router, ActivatedRoute} from '@angular/router';
import { TagSelected } from '../model/business/tag-selected';


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
              private router: ActivatedRoute) { }

  ngOnInit() {
    //CONSULT USER ROL, MUST BE AN ADMINISTRATOR.
    this.router.params.subscribe( params => {
      this.idRestaurant = params['id'].toString();
    });
    //CONSULT DB IF THE RESTAURANT EXISTS BEFORE CONTINUING.
    this.getMenuTypes();
    this.getTags();
  }

  getMenuTypes(): void {
    this.menuTypeService.getMenuTypes().subscribe(menuTypes => this.menuTypes = menuTypes);
  }

  getTags(): void {
    this.restaurantQueryService.getTags().subscribe(tags => {
      let listOfTags : TagSelected[] = [];
      tags.forEach(function (aTag) {listOfTags.push(new TagSelected(aTag));});
      this.tags=listOfTags;
    });
  }

  addMenu(){
    //Get the selected tags
    let listOfTags : Tag[] = [];
    this.tags.forEach(function(aTag){ if(aTag.selected) listOfTags.push(aTag.getTag());});
    this.tagsSelecteds = listOfTags;
    //Create the menu to send to the DB
    this.menu.type = this.menuType;
    this.menu.tags = this.tagsSelecteds;
    console.log(this.menu);
  }

}
