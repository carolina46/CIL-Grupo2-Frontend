import { Category } from '../model/business/category';
import { Component, OnInit, Input } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';
import { RestaurantAdministrationService } from '../restaurant-administration.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  category: Category;
  categories: Category[];

  constructor(private restaurantQueryService: RestaurantQueryService,
    private restaurantAdministrationService: RestaurantAdministrationService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getCategories();
    this.category = new Category();
    this.category.name = '';
  }

  getCategories(): void {
    this.restaurantQueryService.getCategories().subscribe(categories => this.categories = categories);
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.restaurantAdministrationService.addCategory(this.category)
    .subscribe(category => this.category.oid = category.oid);
    this.categories.push(this.category);
  }

}
