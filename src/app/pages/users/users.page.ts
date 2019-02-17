import 'firebase/firestore';

import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {map} from 'rxjs/operators';
import {IFilter, SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {Principal} from 'src/app/services/Principal';

import {INotification} from '../notifications/notifications.model';

import {IUser, User} from './user.model';
import {UsersService, mapToUser} from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  list: User[];
  disabledInfiniteScroll = true;
  account: Account;
  // set default sort
  defaultfilter: IFilter = {
    field: 'creationDate',
    sort: SortType.DESC,
  };
  filter: IFilter = this.defaultfilter;
  filterKeys: string[] = [
    'id', 'creationDate', 'nominative', 'provider', 'providerName', 'type',
    'user', 'paymentType', 'srId'
  ];
  constructor(
      private usersService: UsersService, private principal: Principal) {}

  ngOnInit() {}
  changeFilter(criteria) {
    if (criteria.filter) {
      this.filter = criteria.filter;
    } else {
      this.filter = this.defaultfilter;
    }
    this.transition();
  }

  pageWillEnter() { this.transition(); }
  transition() { this.loadPage(false); }
  loadPage(append) {
    this.usersService.query(append, this.filter).subscribe(data => {
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
  addToContact(user: IUser) {
    const url = `notifications/${user.email}/contacts-request/`;
    const db = firebase.firestore();
    const me: IUser = this.principal.identity();
    if (me) {
      db.collection(url).doc(me.email).set(Object.assign({}, me));
    } else {
      console.log('error me is null', me);
    }
  }
}
