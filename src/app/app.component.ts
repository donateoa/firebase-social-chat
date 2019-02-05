import {Component} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';
import * as firebase from 'firebase';
import {environment} from 'src/environments/environment.prod';

firebase.initializeApp(environment.firebase_config);

@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent {
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'List', url: '/list', icon: 'list'}
  ];

  constructor(
      private platform: Platform, private splashScreen: SplashScreen,
      private statusBar: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
