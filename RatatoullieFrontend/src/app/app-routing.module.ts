import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { DishFormComponent } from './dish-form/dish-form.component';
import { SaveMenuTypeComponent } from './save-menu-type/save-menu-type.component';

const routes: Routes = [
  { path: 'listCategories', component: ListCategoryComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'menuForm', component: MenuFormComponent },
  { path: 'dishForm', component: DishFormComponent },
  { path: 'saveMenuType', component: SaveMenuTypeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
