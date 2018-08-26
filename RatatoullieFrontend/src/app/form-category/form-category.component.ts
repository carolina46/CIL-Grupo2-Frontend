import { Category } from '../model/business/category';
import { Component, OnInit, Input } from '@angular/core';
import { RestaurantQueryService } from '../restaurant-query.service';
import { RestaurantAdministrationService } from '../restaurant-administration.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

    category: Category;
    categories: Category[];
    showAddForm: boolean; // To control whether the add or edit form is displayed
    submited: boolean; // To control that the name field contains something
    categoryEdit: Category;//To save the Category to edit in case they cancel the operation

  constructor(private restaurantQueryService: RestaurantQueryService,
    private restaurantAdministrationService: RestaurantAdministrationService) { }

  ngOnInit() {
    this.getCategories();
    this.category = new Category();
    this.category.name = '';
    this.showAddForm = true;
    this.submited = false; // Did not press the add button
  }

  getCategories(): void {
    this.restaurantQueryService.getCategories().subscribe(categories => this.categories = categories);
  }

  add(): void {
      if (this.category.name.length == 0) { 
          this.submited = true; // Press the add button but the field name is empty
      }
      this.restaurantAdministrationService.addCategory(this.category)
      .subscribe(cat => this.categories.push(cat));
      this.category.name = '';
  }
  
  buttonEdit(category: Category) { // To access to the edit form
      this.categoryEdit = category; // I save it to be used in buttonCancelEdit
      this.categories = this.categories.filter(h => h !== category);//Delete from the list
      this.category.name = category.name; //To show the name of the category to edit in the form
      this.category.oid = category.oid;
      this.showAddForm = false; //show form edit
    }
  
  editCategory() { // updates the category in DB
      let cat = this.category;
      this.restaurantAdministrationService.updateCategory(this.category).subscribe(updated => {
        if(updated){this.categories.push(cat); }});
      this.category = new Category(); // Reset form
      this.category.name = ''; // Reset form
      this.showAddForm = true; // exit form edit and show form add
    }
  
  deleteMenuType(category: Category): void {
      this.restaurantAdministrationService.deleteCategory(category).subscribe(deleted=>{
      if(deleted){ this.categories = this.categories.filter(h => h !== category);}});
  }
  
  buttonCancelEdit() {//Not make the change
      this.categories.push(this.category); // I return it to the list of menuTypes
      this.category = new Category(); // Reset form
      this.category.name = ''; //Reset form
      this.showAddForm = true; // show form add
    }

}
