import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../model/business/menu';

@Component({
  selector: 'app-my-restaurant',
  templateUrl: './my-restaurant.component.html',
  styleUrls: ['./my-restaurant.component.scss']
})
export class MyRestaurantComponent implements OnInit {

  constructor(private router : ActivatedRoute) { }

  id : number;
  menus : Menu[];

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'].toString();
  });

  //Debemos buscar en la bd el reto con sus menus.
  
  this.menus=[];
  let m : Menu;
  m = new Menu();
  m.name="Menu1"
  this.menus.push(m);
  m = new Menu();
  m.name="Menu2"
  this.menus.push(m);
  m = new Menu();
  m.name="Menu3"
  this.menus.push(m);
  m = new Menu();
  m.name="Menu4"
  this.menus.push(m);
  


  }

}
