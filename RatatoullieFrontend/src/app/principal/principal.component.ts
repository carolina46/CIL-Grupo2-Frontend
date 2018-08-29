import { Component, OnInit } from '@angular/core';
import { LocalStorageServiceService } from '../local-storage-service.service';
import { UserSession } from "../model/users/user-session";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  loggedUser: UserSession;

  constructor(private localStorageService: LocalStorageServiceService) { }

  ngOnInit() {
     this.loggedUser = this.localStorageService.getUserFromLocalStorage();
  }

}
