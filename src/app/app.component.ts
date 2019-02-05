import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent {
  user$: Observable<any>;
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'Contatcts', url: '/contacts', icon: 'contacts'}
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
      this.user$ = this.angularFireAuth.authState;
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
