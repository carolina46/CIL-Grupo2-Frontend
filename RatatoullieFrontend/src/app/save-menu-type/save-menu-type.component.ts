import { Component, OnInit } from '@angular/core';
import { MenuType } from '../model/business/menu-type';
import { MenuTypeService } from '../menu-type.service';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-save-menu-type',
  templateUrl: './save-menu-type.component.html',
  styleUrls: ['./save-menu-type.component.scss']
})
export class SaveMenuTypeComponent implements OnInit {

  constructor(private menuTypeService: MenuTypeService) { }

  menuTypes: MenuType[]; // List of existing menuType
  submited: boolean; // To control that the name field contains something
  menuType: MenuType; // Auxiliary variable to save changes
  showAddForm: boolean; // To control whether the add or edit form is displayed
  menuTypeEdit: MenuType;//To save the menuType to edit in case they cancel the operation

  ngOnInit() {
    this.getMenuTypes();
    this.menuType = new MenuType();
    this.menuType.name = '';
    this.submited = false; // Did not press the add button
    this.showAddForm = true;
  }

  agregar() {
    if (this.menuType.name.length == 0) { 
      this.submited = true;//Press the add button but the field name is empty
    } else {
      this.menuTypeService.saveMenuType(this.menuType).subscribe(menuType => {
        if(menuType.name.length>0){this.menuTypes.push(menuType);}
      });
      this.submited=false;//Reset form
      this.menuType.name="";//Reset form
      
    }  
  }

  deleteMenuType(menuType: MenuType): void {
    this.menuTypeService.deleteMenuType(menuType).subscribe(deleted=>{
    if(deleted){ this.menuTypes = this.menuTypes.filter(h => h !== menuType);}});
  }

  editMenuType() {
    this.menuTypeEdit=this.menuType;
    this.menuTypeService.updateMenuType(this.menuTypeEdit).subscribe(updated => {
      if(updated){this.menuTypes.push(this.menuTypeEdit); }});
    this.menuType = new MenuType();//Reset form
    this.menuType.name = '';//Reset form
    this.showAddForm = true; // exit form edit and show form add
  }

  getMenuTypes(): void {
    this.menuTypeService.getMenuTypes().subscribe(menuTypes => this.menuTypes = menuTypes);
  }

  buttonEdit(menuType: MenuType) {//To access to the edit form
    this.menuTypeEdit=menuType;//I save it to be used in buttonCancelEdit
    this.menuTypes = this.menuTypes.filter(h => h !== menuType);//Delete from the list
    this.menuType = menuType; //To show the name of the menutype to edit in the form
    this.showAddForm = false; //show form edit
  }

  buttonCancelEdit() {//Not make the change
    this.menuType = new MenuType(); //Reset form
    this.menuType.name = ''; //Reset form
    this.showAddForm = true; // show form add
    this.menuTypes.push(this.menuTypeEdit); //I return it to the list of menuTypes
  }
}
