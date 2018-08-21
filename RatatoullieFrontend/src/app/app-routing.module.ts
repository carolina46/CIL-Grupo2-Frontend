import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { DishFormComponent } from './dish-form/dish-form.component';
import { SaveMenuTypeComponent } from './save-menu-type/save-menu-type.component';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'listCategories', component: ListCategoryComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'menuForm', component: MenuFormComponent },
  { path: 'dishForm', component: DishFormComponent },
  { path: 'saveMenuType', component: SaveMenuTypeComponent },
  {  path: '**', redirectTo: '/principal'} //It should always be at the end of the list

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
