import 'firebase/auth';

import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {IonContent, IonInfiniteScroll} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {FacebookService, UIParams, UIResponse} from 'ngx-facebook';
import {Observable} from 'rxjs';
import {IFilter, SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {environment} from 'src/environments/environment';

import {User} from '../users/user.model';

import {ContatctService} from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
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
  constructor(private contactService: ContatctService) {}

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
    this.contactService.query(append, this.filter).subscribe(data => {
      if (data.length <= 0) {
        // disable infinite-scroll when data are fineshed
        this.disabledInfiniteScroll = true;
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
