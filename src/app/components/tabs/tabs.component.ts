import 'firebase/firestore';

import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import {Principal} from 'src/app/services/Principal';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  notifications$: Observable<any>;
  constructor(private principal: Principal) {}

  ngOnInit() {
    const user = this.principal.identity();
    const docRef = firebase.firestore().doc(user.getNotificationsDocument());
    let observable = Observable.create(observer => docRef.onSnapshot(observer));
    this.notifications$ = observable.pipe(
        map((t: firebase.firestore.DocumentSnapshot) => t.data()));
    this.notifications$.subscribe(
        {next(value) { console.log('Receive Notificiation: ', value); }});
  }
}
