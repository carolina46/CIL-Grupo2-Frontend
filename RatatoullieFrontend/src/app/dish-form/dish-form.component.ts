import { Component, OnInit } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Dish } from '../model/business/dish';
import { TagSelected } from '../model/business/tag-selected';
import { Tag } from '../model/business/tag';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss']
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
  dish = new Dish();
  tagsSelecteds : Tag[];

  
  constructor(private restaurantQueryService : RestaurantQueryService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    /*CONSULT USER ROL, MUST BE AN ADMINISTRATOR.
    this.router.params.subscribe( params => {
      this.idRestaurant = params['idRestaurant'].toString();
      this.idMenu = params['idMenu'].toString();
    });
    //CONSULT DB IF THE RESTAURANT AND MENU EXISTS BEFORE CONTINUING.*/
    this.getTags();
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
    this.tagsSelecteds = listOfTags;
    //Create the dish to send to the DB
    this.dish.tags = this.tagsSelecteds;
    console.log(this.dish);
  }


}
