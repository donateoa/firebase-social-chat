import 'firebase/auth';
import 'firebase/firestore';

import {Injectable} from '@angular/core';
import {Query} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Observable, from, of } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {PAGE_SIZE} from 'src/app.constants';
import {IFilter} from 'src/app/components/entity-filter/entity-filter.model';
import {RestInterface} from 'src/app/services/rest.interface';

import {User} from '../pages/users/user.model';
import {mapToUser} from '../pages/users/users.service';
// import {IUser, User} from '../pages/users/user.model';

@Injectable()
export class RestService<T> implements RestInterface<T> {
  lastVisible: T;
  firstVisible: T;
  constructor() {}
  getAuthUser = (): User => mapToUser(firebase.auth().currentUser)
  getUrl(): string {
    // this function must be implemented in the exdented service.
    return null;
  }

  mapToObj = (data: any): T => <T>Object.assign({}, data);

  create(data: T): Observable<T> {
    const db = firebase.firestore();
    const url = this.getUrl();
    if (url) {
      console.log('Request for creare:', url, data);
      var refDoc = db.collection(url).doc();
      const now = firebase.firestore.FieldValue.serverTimestamp();
      // add the follow property
      data['creationDate'] = now;
      data['uid'] = refDoc.id;
      return from(refDoc.set(data).then(() => data));
    } else {
      return null;
    }
  }

  update(data: T): Observable<T> {
    const db = firebase.firestore();
    const url = this.getUrl();
    if (url) {
      console.log('Request for update:', url, data);
      var refDoc = db.collection(url).doc(data['uid']);
      return from(refDoc.set(data).then(() => data));
    } else {
      return null;
    }
  }

  find(id: string): Observable<T> {
    const db = firebase.firestore();
    const url = this.getUrl();
    if (url) {
      const uri = `${url}/${id}`
      console.log(`Recived request for : GET "${uri}"`);
      return from(db.doc(uri).get().then(t => {
        console.log(`Fetch finished loading: GET "${uri}"`);
        return this.mapToObj(t.data())
      }))
    } else {
      return null;
    }
  }

  delete (id: number|string): Observable<T> { return null; }
  // listen for realtime update
  onSnapshot(next?: boolean, filter?: IFilter): Observable<T> {
    const db = firebase.firestore();
    const url = this.getUrl();
    const pageSize = filter.pageSize ? filter.pageSize : PAGE_SIZE;
    if (!url) {
      return of (null);
    } else {
      let listRef: Query = db.collection(url);
      if (filter) {
        if (filter.value) {
          listRef = listRef.where(filter.field, filter.operator, filter.value);
        }
        if (filter.sort) {
          listRef = listRef.orderBy(filter.field, filter.sort);
        }
      }
      if (next) {
        listRef = listRef.endBefore(this.firstVisible)
      }
      return Observable.create(subscriber => {
        listRef.limit(pageSize).onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach(change => {
            const O = this.mapToObj(change.doc.data());
            if (change.type === 'added') {
              subscriber.next(O);
            }
            this.lastVisible = O;
          });
        });
      });
    }
  }

  // get once
  query(next?: boolean, filter?: IFilter): Observable<T[]> {
    const db = firebase.firestore();
    const url = this.getUrl();
    const pageSize = filter.pageSize ? filter.pageSize : PAGE_SIZE;
    console.log('Request for url:', url);
    if (!url) {
      return of (null);
    } else {
      let listRef: Query = db.collection(url);
      if (filter) {
        if (filter.value) {
          listRef = listRef.where(filter.field, filter.operator, filter.value);
        }
        if (filter.sort) {
          listRef = listRef.orderBy(filter.field, filter.sort);
        }
      }
      if (next) {
        listRef = listRef.startAfter(this.lastVisible)
      }

      return from(listRef.limit(pageSize).get())
          .pipe(
              tap((t) => this.setLastVisible(t)),
              tap((t) => this.setFirstVisible(t)),
              map(d => d.docs.map(t => this.mapToObj(t.data()))));
    }
  }
  setLastVisible(documentSnapshots) {
    this.lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
    return documentSnapshots;
  }
  setFirstVisible(documentSnapshots) {
    this.firstVisible = documentSnapshots.docs[0];
    return documentSnapshots;
  }
}
