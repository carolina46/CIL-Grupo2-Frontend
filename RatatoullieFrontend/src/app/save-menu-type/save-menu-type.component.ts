import { Component, OnInit } from '@angular/core';
import { MenuType } from '../model/business/menu-type';
import { RestaurantQueryService } from '../restaurant-query.service';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-save-menu-type',
  templateUrl: './save-menu-type.component.html',
  styleUrls: ['./save-menu-type.component.scss']
})
export class SaveMenuTypeComponent implements OnInit {

  constructor(private restaurantQueryService: RestaurantQueryService) { }

  menuTypes: MenuType[]; // List of existing menuType
  submited: boolean; // To control that the name field contains something
  menuType: MenuType; // Auxiliary variable to save changes
  showAddForm: boolean; // To control whether the add or edit form is displayed

  ngOnInit() {
    this.getMenuTypes();
    this.menuType = new MenuType();
    this.menuType.name = '';
    this.submited = false; // Did not press the add button
    this.showAddForm = true;
  }

  agregar() {
    if (this.menuType.name.length == 0) {
      this.submited = true;
    } else {
      let aux = new MenuType();
      this.restaurantQueryService.saveMenuType(this.menuType).subscribe(menuType => {
        aux = menuType;
      });
      this.submited = false;
      this.menuType.name = '';
      if (aux.name.length > 0) {
        this.menuTypes.push(aux);
      }
    }
  }

  delete(menuType: MenuType): void {
    this.menuTypes = this.menuTypes.filter(h => h !== menuType);
    this.restaurantQueryService.deleteMenuType(menuType).subscribe();
  }

  edit() {
    this.showAddForm = true; // show form add
    this.restaurantQueryService.updateMenuType(this.menuType);
    console.log(this.menuType.oid);
  }

  getMenuTypes(): void {
    this.restaurantQueryService.getMenuTypes().subscribe(menuTypes => this.menuTypes = menuTypes);
  }

  buttonEdit(menuType: MenuType) {
    this.menuType = menuType;
    this.showAddForm = false; // show form edit
  }
  buttonCancelEdit() {
    this.menuType = new MenuType();
    this.menuType.name = '';
    this.showAddForm = true; // show form add
  }
}
