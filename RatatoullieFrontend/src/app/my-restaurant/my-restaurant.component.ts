import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-restaurant',
  templateUrl: './my-restaurant.component.html',
  styleUrls: ['./my-restaurant.component.scss']
})
export class MyRestaurantComponent implements OnInit {

  constructor(private router : ActivatedRoute) { }

  id: number;

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'].toString();
  });
  }

}
