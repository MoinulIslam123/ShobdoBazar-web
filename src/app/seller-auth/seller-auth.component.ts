import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp ,Login} from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}
  ngOnInit(): void {
    this.seller.relaodSeller();
  }
  showLogin = false;
  authError: string= '';
  signUp(data: SignUp): void {
    this.seller.userSignUp(data); //.subscribe((result) => {
    //   if (result) {
    //     this.router.navigate(['seller-home']);
    //   }
    // });
  }
  login(data: SignUp): void {
    // console.warn(data)
    this.authError=" ";
    this.seller.userLogin(data); 
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
        this.authError='Email Or Password is incorrect'
      }
    }
    );
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
}
