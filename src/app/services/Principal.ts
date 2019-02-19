import 'firebase/auth';

import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';

import {IUser, User} from '../pages/users/user.model';
import {mapToUser} from '../pages/users/users.service';

@Injectable({providedIn: 'root'})
export class Principal {
  constructor() {}

  mapToUser(data: any): User {
    const result: User = new User();
    if (!data) {
      return null;
    }
    result.uid = data.uid;
    result.displayName = data.displayName;
    result.email = data.email;
    result.photoURL = data.photoURL;
    return result;
  }
  identity(): User { return mapToUser(firebase.auth().currentUser); }

  getAuthenticationState(): Observable<IUser> {
    return Observable.create(obs => firebase.auth().onAuthStateChanged(obs))
        .pipe(map((user) => mapToUser(user)));
  }
}
