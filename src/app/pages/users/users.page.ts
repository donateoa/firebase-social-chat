import 'firebase/firestore';

import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {map} from 'rxjs/operators';
import {IFilter, SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {Principal} from 'src/app/services/Principal';

import {ContactsService} from '../contacts/contacts.service';
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
      private usersService: UsersService, private principal: Principal,
      private contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.query(false, {pageSize: 20000})
        .subscribe(data => console.log('contacts', data));
  }
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
  addToContact(user: User) {
    const me: User = this.principal.identity();
    if (me) {
      const docRef = firebase.firestore().doc(user.getNotificationsDocument());

      docRef.get()
          .then(
              (doc) =>
                  doc.exists ? (doc.data().contactNotifications || 0) + 1 : 1)
          .then(num => docRef.set({'contactNotifications': num}, {merge: true}))
          .then(
              () => docRef.collection('contacts-request')
                        .doc(me.email)
                        .set(Object.assign({}, me)))
          .then(() => console.log('Request sent'));
    } else {
      console.log('error me is null', me);
    }
  }
}
