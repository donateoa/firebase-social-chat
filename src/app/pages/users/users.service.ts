import 'firebase/firestore';
import 'firebase/functions';

import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable, from} from 'rxjs';
import {IFilter} from 'src/app/components/entity-filter/entity-filter.model';
import {RestInterface} from 'src/app/services/rest.interface';

import {IUser, User} from '../users/user.model';

export function mapToUser(data: any): User {
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

@Injectable({providedIn: 'root'})
export class UsersService implements RestInterface<User> {
  constructor() {}
  lastVisible: string;

  create(data: User): Observable<User> { return null; }

  update(data: User): Observable<User> { return null; }

  findByEmail(email: string): Observable<IUser> {
    const firebaseFunction = firebase.functions().httpsCallable('getUser');
    const data = {email: email};
    return from(
        firebaseFunction(data).then(response => mapToUser(response.data)));
  }
  find(id: string): Observable<User> {
    const firebaseFunction = firebase.functions().httpsCallable('getUser');
    const data = {uid: id};
    return from(
        firebaseFunction(data).then(response => mapToUser(response.data)));
  }

  delete (id: number|string): Observable<any> { return null; }

  query(next?: boolean, filter?: IFilter): Observable<User[]> {
    const firebaseFunction = firebase.functions().httpsCallable('allUsers');
    const that = this;
    const data = {};
    if (next && this.lastVisible) {
      data['nextPageToken'] = this.lastVisible;
    }
    return from(firebaseFunction(data).then(response => {
      that.lastVisible = response.data.pageToken;
      return response.data.users.map(user => mapToUser(user));
    }))
  }
  setLastVisible(documentSnapshots) {
    this.lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
    return documentSnapshots;
  }
}
