import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router/src/utils/preactivation';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  path;
  route;
  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {}

  canActivate(): boolean {
    if (this.angularFireAuth.auth.currentUser) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  };
}