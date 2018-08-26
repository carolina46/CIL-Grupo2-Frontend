import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MenuComponent } from './menu/menu.component';
import { ListCategoryComponent } from './form-category/form-category.component';
import { PrincipalComponent } from './principal/principal.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { DishFormComponent } from './form-dish/form-dish.component';
import { SaveMenuTypeComponent } from './save-menu-type/save-menu-type.component';
import { MessagesComponent } from './messages/messages.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyRestaurantsComponent } from './my-restaurants/my-restaurants.component';
import { MyRestaurantComponent } from './my-restaurant/my-restaurant.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListCategoryComponent,
    PrincipalComponent,
    MenuFormComponent,
    DishFormComponent,
    SaveMenuTypeComponent,
    MessagesComponent,
    WelcomeComponent,
    MyRestaurantsComponent,
    MyRestaurantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
