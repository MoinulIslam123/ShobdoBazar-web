import { Component } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  showLogin: boolean = true;
authError:string= ""
  constructor(private user: UserService) {}
  ngOnInit() {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn('Hoini', result);
      if(result){
        this.authError="User is unvalid";
      }
    
    });
    
  }

  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
