import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Platform} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {Subscription} from 'rxjs';
import {environment} from 'src/environments/environment.prod';


@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent {
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'List', url: '/list', icon: 'list'}
  ];

  constructor(
      private platform: Platform, private angularFireAuth: AngularFireAuth) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.angularFireAuth.authState.subscribe(this.firebaseAuthChangeListener);
    });
  }


  private firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      console.log('Logged in :)');
    } else {
      console.log('Logged out :(');
    }
  }
}
