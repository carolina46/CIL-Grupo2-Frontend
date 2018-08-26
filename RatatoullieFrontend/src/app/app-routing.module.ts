import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './form-category/form-category.component';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { MenuFormComponent } from './form-menu/form-menu.component';
import { DishFormComponent } from './form-dish/form-dish.component';
import { MyRestaurantsComponent } from './my-restaurants/my-restaurants.component';
import { MyRestaurantComponent } from './my-restaurant/my-restaurant.component';
import { SaveMenuTypeComponent } from './save-menu-type/save-menu-type.component';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'listCategories', component: ListCategoryComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'dishForm', component: DishFormComponent },
  { path: 'saveMenuType', component: SaveMenuTypeComponent },
  { path: 'myRestaurants', component: MyRestaurantsComponent },
  { path: 'myRestaurants/restaurant/:id', component: MyRestaurantComponent },
  { path: 'myRestaurants/restaurant/:id/addMenu', component: MenuFormComponent },
  {  path: '**', redirectTo: '/principal'} //It should always be at the end of the list

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
