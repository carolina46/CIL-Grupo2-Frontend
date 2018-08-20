import { Component, OnInit } from '@angular/core';
import { Login } from '../model/users/login';
import { Signin } from '../model/users/signin';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  login : Login; //To save log in information
  signIn : Signin; //To save sign in information
  showSignInForm : boolean; //To control if show introduction text or sign in form
  responsible : boolean; //To know what type of user is gonna be
  
  constructor() {}

  ngOnInit() {
    this.showSignInForm = false;//Show introduction text
    this.login = new Login();
    this.login.user="";
    this.login.password="";
    this.signIn = new Signin();
  }

  logIn(){ 
    if(this.login.password.length > 0 && this.login.user.length > 0 )
      console.log("Comprobar usuario");
      

   }

  showFormSignIn(){
    console.log("registrarse");
    this.showSignInForm = true;
  }

  singIn(){ 

  }
   
  cancelSignIn(){ }

  

}
