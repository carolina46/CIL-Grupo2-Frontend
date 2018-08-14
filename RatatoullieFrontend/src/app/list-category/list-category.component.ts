import { Component, OnInit } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories: object;

  constructor(private restaurantQueryService: RestaurantQueryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.restaurantQueryService.getCategories().subscribe(categories => this.categories = categories);
  }

}
