import { Component, OnInit } from '@angular/core';
import { Login } from '../model/users/login';
import { Signin } from '../model/users/signin';
import { LocalStorageServiceService } from '../local-storage-service.service';
import {Router} from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UsersService } from '../users.service';
import { UserSession } from '../model/users/user-session';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  login : Login; //To save login information
  problemLogin : boolean; //To verify if the login error message is displayed.
  messageProblemLogin : String; //Login error mesage.
  signin : Signin; //To save signin information
  showSignInForm : boolean; //To control if show introduction text or sign in form
  responsible : boolean; //To know what type of user is gonna be
  registrationFieldsEmpty : boolean; //To show message: complete all fields
  userExistes : boolean; //To show message: user exists
  resultSingin : boolean; //To show the result of sign in of a user
  resultMessage : String; //Result message of sign in of a user
  
  constructor(private localStorage : LocalStorageServiceService,
              private userService : UsersService,
              private router : Router) { }

  ngOnInit() {
    this.showSignInForm = false;//Show introduction text
    this.login = new Login();
    this.clearLogInProperty();
    this.signin = new Signin();
    this.clearSignInProperty();
    this.registrationFieldsEmpty = false;
    this.userExistes = false;
    this.resultSingin = false;
    this.problemLogin = false;
  }

  logIn(){ //Method to enter the system
    if(this.login.password.length > 0 && this.login.user.length > 0 ){
      this.userService.login(this.login).subscribe(UserSession =>{
        console.log(UserSession)
        if(UserSession == null){
          this.problemLogin = true;
          this.messageProblemLogin = "¡El usuario o la contraseña es incorrecta!";
        } 
        else{
          this.localStorage.storeUserOnLocalStorage(UserSession);
          this.router.navigate(['/principal']);
          location.reload();
        }});
    }
    else{
      this.problemLogin = true;
      this.messageProblemLogin = "¡Debe completar todos los campos!";
    }
    /*
    this.localStorage.storeUserOnLocalStorage(new UserSession());
    this.router.navigate(['/principal']);
    location.reload();*/
  }

  showFormSignIn(){//Button "registrarse", Show signin form
    this.showSignInForm = true;
  }

  signInUser(){ //Add a new user 
    //Check if some field is empty
    if (this.signin.fullName == "" || this.signin.password == "" 
        || this.signin.user == "" || this.responsible == null) {
          this.registrationFieldsEmpty = true; //show message "Debe completar todos los campos"
    }
    else{ //Check if user exist
      this.userService.checkUser(this.signin).subscribe(
        exist => { 
          if(exist){ //User exist
            this.registrationFieldsEmpty = false;
            this.userExistes = true; //show message "¡El nombre de usuario ya existe!"
          }
          else{ //User not exist, save it.
            this.userService.saveUser(this.signin, this.responsible).subscribe(
             saved =>{ //Show resul of the operation
               if(saved) this.resultMessage = "El usuario se creo correctamente.";
               else this.resultMessage = "No se pudo crear al nuevo usuario.";
               this.resultSingin = true;
            });
          }
        });
    }
  }
   
  cancelSignIn(){ //Cancel register a new user
    this.showSignInForm = false;
    this.clearSignInProperty();
  }

  clearSignInProperty(){ //Reset sigin property
    this.signin.fullName = "";
    this.signin.password = "";
    this.signin.user = "";
    this.responsible = null;
    this.registrationFieldsEmpty = false;
    this.userExistes = false;
    this.resultMessage = "";
  }

  clearLogInProperty(){ //Reset login property
    this.login.user= "";
    this.login.password= "";
  }
  
  logo(){ //Logo RATATOULLIE redirect to /
    this.router.navigate(['/']);
    location.reload();
  }

  endRegistration(){ //close message result signin 
    this.resultSingin = false;
    this.showSignInForm = false;
    this.clearSignInProperty();
  }

}
