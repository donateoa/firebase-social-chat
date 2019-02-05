import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent {
  authenticated$: Observable<boolean>;
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'List', url: '/list', icon: 'list'}
  ];

  constructor(
      private platform: Platform, private angularFireAuth: AngularFireAuth,
      private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.authenticated$ =
          this.angularFireAuth.authState.pipe(map(res => !!res));
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
