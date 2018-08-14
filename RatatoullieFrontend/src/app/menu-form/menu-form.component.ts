import { Component, OnInit } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menuTypes:object;

  constructor(private restaurantQueryService: RestaurantQueryService) { }

  ngOnInit() {
    this.getMenuTypes();
  }

  getMenuTypes(): void {
    this.restaurantQueryService.getMenuTypes().subscribe(menuTypes => this.menuTypes = menuTypes);
  }


}
