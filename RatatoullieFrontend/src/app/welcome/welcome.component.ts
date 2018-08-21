import { Component, OnInit } from '@angular/core';
import { Login } from '../model/users/login';
import { Signin } from '../model/users/signin';
import { LocalStorageServiceService } from '../local-storage-service.service';
import {Router} from '@angular/router';
import { MenuComponent } from 'src/app/menu/menu.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  login : Login; //To save login information
  signIn : Signin; //To save signin information
  showSignInForm : boolean; //To control if show introduction text or sign in form
  responsible : boolean; //To know what type of user is gonna be
  
  constructor(private localStorage: LocalStorageServiceService,
              private router: Router) { }

  ngOnInit() {
    this.showSignInForm = false;//Show introduction text
    this.login = new Login();
    this.clearLogInProperty;
    this.signIn = new Signin();
    this.clearSignInProperty();
  }

  logIn(){ //Method to enter the system
    //if(this.login.password.length > 0 && this.login.user.length > 0 )
    //  console.log("Comprobar usuario");
    this.localStorage.storeUserOnLocalStorage("aUser");
    this.router.navigate(['/principal']);
    location.reload();
   }

  showFormSignIn(){
    this.showSignInForm = true;
  }

  singIn(){ //Methodo to add a new user 
    this.showSignInForm = false;
    this.clearSignInProperty();
    //Comprobar que la propiedad user no exista
    //llevar datos servidor
  }
   
  cancelSignIn(){ 
    this.showSignInForm = false;
    this.clearSignInProperty();
  }

  clearSignInProperty(){
    this.signIn.fullName = "";
    this.signIn.password = "";
    this.signIn.user = "";
    this.responsible = null;
  }

  clearLogInProperty(){
    this.login.user="";
    this.login.password="";
  }
  

}
