import { Component, OnInit } from '@angular/core';
import { LocalStorageServiceService } from '../local-storage-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private localStorage: LocalStorageServiceService,
    private router: Router) { }

  buttonPressed : Boolean; //To control the menu display

  ngOnInit() {
    this.buttonPressed = false;
  }

  userLogout(){
    this.localStorage.removeUserFromLocalStorage();
    this.router.navigate(['/']);
    location.reload();
  }


  showMenu(){
    this.buttonPressed = ! this.buttonPressed;
  }

}
