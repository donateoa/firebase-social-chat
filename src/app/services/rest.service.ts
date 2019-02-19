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

  constructor() {}
  getAuthUser = () => firebase.auth().currentUser
  getUrl(): Observable<string> {
    // this function must be implemented in the exdented service.
    return of (null);
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
    return this.getUrl().pipe(flatMap(url => {
      if (url) {
        const uri = `${url}/${id}`
        console.log('Request for url:', uri);
        return from(db.doc(uri).get().then(t => {
          console.log('Get result for url:', uri, t.data());
          return this.mapToObj(t.data())
        }))
      } else {
        return null;
      }
    }));
  }

  delete (id: number|string): Observable<T> { return null; }

  query(next?: boolean, filter?: IFilter): Observable<T[]> {
    const db = firebase.firestore();
    return this.getUrl().pipe(flatMap(url => {
      console.log('Request for url:', url);
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
