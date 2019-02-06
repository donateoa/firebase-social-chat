import 'firebase/firestore';

import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {PAGE_SIZE} from 'src/app.constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any;
  docRef: any;
  lastVisible: any;
  disabledInfiniteScroll = true;
  constructor() {}

  ngOnInit() { this.docRef = firebase.firestore().collection(`users`); }
  pageWillEnter() {}

  query(next: boolean) {
    if (next) {
      return this.docRef.orderBy('sendDate', 'desc')
          .startAfter(this.lastVisible)
          .limit(PAGE_SIZE);
    } else {
      return this.docRef.orderBy('sendDate', 'desc').limit(PAGE_SIZE);
    }
  }
  setLastVisible = (documentSnapshots) => this.lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];


  loadPage() {
    this.query(true).get().then(documentSnapshots => {
      if (documentSnapshots.docs.length <= 0) {
        // disable infinite-scroll when data are fineshed
        this.disabledInfiniteScroll = true;
      } else {
        this.users = [
          ...documentSnapshots.docs.map(t => t.data()).reverse(), ...this.users
        ];
        this.setLastVisible(documentSnapshots);
      }
    });
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.loadPage();
    }, 500);
  }
}
