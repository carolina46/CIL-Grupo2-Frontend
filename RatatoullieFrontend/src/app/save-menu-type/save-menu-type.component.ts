import { Component, OnInit } from '@angular/core';
import { MenuType } from '../model/business/menu-type';
import { RestaurantQueryService } from '../restaurant-query.service';

@Component({
  selector: 'app-save-menu-type',
  templateUrl: './save-menu-type.component.html',
  styleUrls: ['./save-menu-type.component.scss']
})
export class SaveMenuTypeComponent implements OnInit {

  constructor(private restaurantQueryService: RestaurantQueryService) { }

  menuType=new MenuType();

  ngOnInit() {
  }

  onSubmit() {

   }

   addMenuTypes(): void {
    //this.restaurantQueryService.addMenuTypes(menuType);
  }
}
