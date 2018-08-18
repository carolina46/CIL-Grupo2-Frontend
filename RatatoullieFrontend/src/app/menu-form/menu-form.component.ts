import { Component, OnInit } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';
import { Menu } from '../model/business/menu';
import { MenuType } from '../model/business/menu-type';
import { Tag } from '../model/business/tag';
import {Router} from "@angular/router";


@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menu = new Menu();
  menuType = new MenuType();
  

  menuTypes: MenuType[];
  tags: Tag[];
  

  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.menu); }
  submitted = false;
  
  onSubmit() { this.submitted = true; 
    this.router.navigate(['/principal']);}

  constructor(private restaurantQueryService: RestaurantQueryService, private router: Router) { }

  ngOnInit() {
    this.getMenuTypes();
    this.getTags();
  }

  getMenuTypes(): void {
    this.restaurantQueryService.getMenuTypes().subscribe(menuTypes => this.menuTypes = menuTypes);
  }

  getTags():void{
    this.restaurantQueryService.getTags().subscribe(tags => this.tags = tags);
  }



}
