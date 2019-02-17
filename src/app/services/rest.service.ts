import 'firebase/auth';

import {Inject, Injectable, Optional} from '@angular/core';
import {Observable, from, of } from 'rxjs';
import {RestInterface} from 'src/app/services/rest.interface';

import {flatMap,} from 'rxjs/operators';
import 'firebase/firestore';
import {Query} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {IFilter} from 'src/app/components/entity-filter/entity-filter.model';
import {PAGE_SIZE} from 'src/app.constants';
// import {IUser, User} from '../pages/users/user.model';

@Injectable()
export class RestService<T> implements RestInterface {
  lastVisible: T;

  constructor(

      @Inject('collectionKeyBeforeLogin') public collectionKeyBeforeLogin?:
          string,
      @Inject('collectionKeyAfterLogin') public collectionKeyAfterLogin?:
          string, ) {}

  getUrl() {
    if (firebase.auth().currentUser) {
      return of (
          `${this.collectionKeyBeforeLogin}/${firebase.auth().currentUser.email}/${this.collectionKeyAfterLogin}`);
    } else {
      return of (null);
    }
  }

  mapToObj(data: any): T {
    const result: any = {};
    if (!data) {
      return null;
    }
    Object.keys(data)
        .filter(key => data[key] !== undefined)  // remove null or undefined
        .map(key => result[key] = data[key]);
    return result;
  }

  create(data: any): Observable<T> { return null; }

  update(data: any): Observable<T> { return null; }

  find(id: string): Observable<T> {
    const db = firebase.firestore();
    return this.getUrl().pipe(flatMap(
        url => url ? from(db.collection(url).doc(id).get().then(
                         t => this.mapToObj(t.data()))) :
                     null));
  }

  delete (id: number|string): Observable<T> { return null; }

  query(next?: boolean, filter?: IFilter): Observable<T[]> {
    const db = firebase.firestore();
    return this.getUrl().pipe(flatMap(url => {
      if (!url) {
        return [];
      } else {
        let listRef: Query = db.collection(url);
        if (filter) {
          if (filter.value) {
            listRef =
                listRef.where(filter.field, filter.operator, filter.value);
          }
          if (filter.sort) {
            listRef = listRef.orderBy(filter.field, filter.sort);
          }
        }
        if (next) {
          listRef = listRef.startAfter(this.lastVisible)
        }
        return listRef.limit(PAGE_SIZE)
            .get()
            .then((t) => this.setLastVisible(t))
            .then(d => d.docs.map(t => this.mapToObj(t.data())));
      }
    }));
  }
  setLastVisible(documentSnapshots) {
    this.lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
    return documentSnapshots;
  }
}
