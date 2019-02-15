import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, from, of } from 'rxjs';
import {RestInterface} from 'src/app/services/rest.interface';

import {IUser, User} from '../users/user.model';

import {map, flatMap,} from 'rxjs/operators';
import 'firebase/firestore';

import {Query} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {IFilter} from 'src/app/components/entity-filter/entity-filter.model';
import {PAGE_SIZE} from 'src/app.constants';
import 'firebase/functions';

@Injectable({providedIn: 'root'})
export class UsersService implements RestInterface {
  constructor(private angularFireAuth: AngularFireAuth) {}
  lastVisible: string;

  getUrl = () => of ('users');

  mapToObj(data: any): object {
    const result: User = new User();
    if (!data) {
      return null;
    }
    Object.keys(data)
        .filter(key => data[key] !== undefined)  // remove null or undefined
        .map(key => result[key] = data[key]);
    return result;
  }

  create(data: any): Observable<any> { return null; }

  update(data: any): Observable<any> { return null; }

  find(id: string): Observable<User> {
    const db = firebase.firestore();
    return this.getUrl().pipe(flatMap(
        url => url ? from(db.collection(url).doc(id).get().then(
                         t => this.mapToObj(t.data()))) :
                     null));
  }

  delete (id: number|string): Observable<any> { return null; }

  query(next?: boolean, filter?: IFilter): Observable<any[]> {
    const firebaseFunction = firebase.functions().httpsCallable('allUsers');
    const that = this;
    return from(firebaseFunction({}).then(response => {
      that.lastVisible = response.data.pageToken;
      return response.data.users;
    }))

    // const db = firebase.firestore();
    // return this.getUrl().pipe(flatMap(url => {
    //   if (!url) {
    //     return [];
    //   } else {
    //     let listRef: Query = db.collection(url);
    //     if (filter) {
    //       if (filter.value) {
    //         listRef =
    //             listRef.where(filter.field, filter.operator, filter.value);
    //       }
    //       if (filter.sort) {
    //         listRef = listRef.orderBy(filter.field, filter.sort);
    //       }
    //     }
    //     if (next) {
    //       listRef = listRef.startAfter(this.lastVisible)
    //     }
    //     return listRef.limit(PAGE_SIZE)
    //         .get()
    //         .then((t) => this.setLastVisible(t))
    //         .then(d => d.docs.map(t => this.mapToObj(t.data())));
    //   }
    // }));
  }
  setLastVisible(documentSnapshots) {
    this.lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
    return documentSnapshots;
  }
}
