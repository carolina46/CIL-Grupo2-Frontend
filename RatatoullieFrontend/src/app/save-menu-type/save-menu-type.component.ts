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

  menuTypes: MenuType[];
  submited: boolean;
  mt = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];
  menuType: MenuType;
  
  ngOnInit() {
    this.getMenuTypes();
    this.menuType=new MenuType();
    this.menuType.name="";
    this.submited=false;
  }

  agregar() {
    if(this.menuType.name.length==0){
      this.submited=true;
    }
    else{
      this.submited=false;
      this.menuType.name="";
      console.log(this.menuType);
      console.log(this.restaurantQueryService.saveMenuTypes(this.menuType));
    }  
    
    
  }

  delete(){
    console.log("delete");
  }

  edit(){
    console.log("edit");
  }

  getMenuTypes(): void {
    this.restaurantQueryService.getMenuTypes().subscribe(menuTypes => this.menuTypes = menuTypes);
  }
}
