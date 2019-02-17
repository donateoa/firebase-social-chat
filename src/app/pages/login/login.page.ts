import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {Subscription} from 'rxjs';
import {Principal} from 'src/app/services/Principal';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy,
    OnInit {
  subscription: Subscription;
  constructor(private principal: Principal, private router: Router) {}

  ngOnInit(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.principal.getAuthenticationState().subscribe(
        (response) => this.firebaseAuthChangeListener(response));
  }

  private firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      this.router.navigate(['/home']);
    } else {
      console.log('Logged out :(');
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData);
  }

  errorCallback(errorData: FirebaseUISignInFailure) { console.log(errorData) }
}
