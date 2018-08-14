import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { PrincipalComponent } from './principal/principal.component';
import { MenuFormComponent } from './menu-form/menu-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListCategoryComponent,
    PrincipalComponent,
    MenuFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
