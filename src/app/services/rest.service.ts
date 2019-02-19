import 'firebase/auth';
import 'firebase/firestore';

import {Injectable} from '@angular/core';
import {Query} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Observable, Subject, from, of } from 'rxjs';
import {map} from 'rxjs/operators';
import {PAGE_SIZE} from 'src/app.constants';
import {IFilter} from 'src/app/components/entity-filter/entity-filter.model';
import {RestInterface} from 'src/app/services/rest.interface';

import {User} from '../pages/users/user.model';
import {mapToUser} from '../pages/users/users.service';
// import {IUser, User} from '../pages/users/user.model';

@Injectable()
export class RestService<T> implements RestInterface<T> {
  lastVisible: T;

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
      var refDoc = db.collection(url).doc();
      const now = firebase.firestore.FieldValue.serverTimestamp();
      // add the follow property
      data['creationDate'] = now;
      data['uid'] = refDoc.id;
      console.log('Request for creare:', data);
      return from(refDoc.set(data).then(() => data));
    } else {
      return null;
    }
  }

  update(data: T): Observable<T> {
    const db = firebase.firestore();
    const url = this.getUrl();
    if (url) {
      var refDoc = db.collection(url).doc(data['uui']);
      console.log('Request for update:', data);
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
      console.log('Request for url:', uri);
      return from(db.doc(uri).get().then(t => {
        console.log('Get result for url:', uri, t.data());
        return this.mapToObj(t.data())
      }))
    } else {
      return null;
    }
  }

  delete (id: number|string): Observable<T> { return null; }
  // listen for realtime update
  onSnapshot(next?: boolean, filter?: IFilter): Observable<T[]> {
    const db = firebase.firestore();
    const that = this;
    const url = this.getUrl();
    console.log('Listen  onSnapshotfor url:', url);
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
      const subject: Subject<T[]> = new Subject();
      listRef.limit(PAGE_SIZE).onSnapshot(function(querySnapshot) {
        const list: T[] = [];
        querySnapshot.forEach(function(doc) {
          list.push(that.mapToObj(doc.data()));
        });
        subject.next(list);
      });
      return subject.asObservable();
    }
  }
  // get once
  query(next?: boolean, filter?: IFilter): Observable<T[]> {
    const db = firebase.firestore();
    const url = this.getUrl();

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
      return from(listRef.limit(PAGE_SIZE).get().then(
                      (t) => this.setLastVisible(t)))
          .pipe(map(d => d.docs.map(t => this.mapToObj(t.data()))));
    }
  }
  setLastVisible(documentSnapshots) {
    this.lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
    return documentSnapshots;
  }
}
