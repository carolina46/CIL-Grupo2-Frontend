import { Component, OnInit } from '@angular/core';
import { LocalStorageServiceService } from '../local-storage-service.service';
import {Router} from '@angular/router';
import { UserSession } from "../model/users/user-session";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loggedUser: UserSession;

  constructor(private localStorage: LocalStorageServiceService,
    private router: Router) { }

  buttonPressed : Boolean; //To control the menu display

  ngOnInit() {
    this.buttonPressed = false;
    this.loggedUser = this.localStorage.getUserFromLocalStorage();
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
