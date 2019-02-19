import 'firebase/functions';
import 'firebase/firestore';

import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {IFilter, SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {Principal} from 'src/app/services/Principal';

import {IUser} from '../users/user.model';
import {ChatService} from './chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  list: IUser[];
  disabledInfiniteScroll = true;
  account: Account;
  // set default sort
  defaultfilter: IFilter = {
    field: 'displayName',
    sort: SortType.ASC,
  };
  filter: IFilter = this.defaultfilter;
  filterKeys: string[] = ['uid', 'displayName', 'email'];
  constructor(private principal: Principal, private restService: ChatService) {}

  ngOnInit() {}
  changeFilter(criteria) {
    if (criteria.filter) {
      this.filter = criteria.filter;
    } else {
      this.filter = this.defaultfilter;
    }
    this.transition();
  }

  pageWillEnter() {
    this.transition();
    // reset num of notification must be read
    const user = this.principal.identity();
    const docRef = firebase.firestore().doc(`notification/${user.email}`);
    docRef.set({'messages': 0}, {merge: true})
        .then(() => console.log('reset num of message must be read'))
        .catch((e) => console.log('error during reset message', e));
  }
  transition() { this.loadPage(false); }
  loadPage(append) {
    this.restService.query(append, this.filter).subscribe(data => {
      console.log(data);
      if (data.length <= 0) {
        // disable infinite-scroll when data are fineshed
        this.disabledInfiniteScroll = true;
        // disable loading if present
        if (!this.list) {
          this.list = [];
        }
      } else {
        if (!append) {
          this.list = [];
        }
        this.list = [...this.list, ...data];
        this.disabledInfiniteScroll = false;
      }
    });
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.loadPage(true);
    }, 500);
  }
}
