import { Component } from '@angular/core';
import { LocalStorageServiceService } from './local-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'RatatoullieFrontend';
  userIsLogin : Boolean;

  constructor(private localStorage: LocalStorageServiceService) { }

  ngOnInit(){
    if (this.localStorage.getUserFromLocalStorage() != null) this.userIsLogin = true;
    else this.userIsLogin = false;
  }

  
}
