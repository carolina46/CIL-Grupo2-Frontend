import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss']
})
export class MyMenuComponent implements OnInit {

  idRestaurant : number;
  idMenu : number;

  constructor(private router : ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
    this.idRestaurant = params['idR'].toString();
    this.idMenu = params['idM'].toString();
});
  }

  goBack(){
    window.history.back();
  }


}
