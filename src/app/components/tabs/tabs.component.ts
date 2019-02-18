import 'firebase/firestore';

import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable, of } from 'rxjs';
import {Principal} from 'src/app/services/Principal';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  unsubscribe;
  messages$: Observable<number>;
  requests$: Observable<number>;
  constructor(private principal: Principal) {}

  ngOnInit() {
    const user = this.principal.identity();
    const docRef = firebase.firestore().doc(`notification/${user.email}`);
    this.unsubscribe = docRef.onSnapshot(documentSnapshots => {
      console.log(documentSnapshots.data());
      this.messages$ = of (documentSnapshots.data().messages);
      this.messages$ = of (documentSnapshots.data().contactNotifications);
    });
  }
  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
