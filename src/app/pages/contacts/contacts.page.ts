import 'firebase/auth';

import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {IonInfiniteScroll} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {FacebookService, UIParams, UIResponse} from 'ngx-facebook';
import {MeFacebookService} from 'src/app/services/me-facebook.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: any;
  contacts = [];
  nextPage: string;
  uri: string;
  numItems: number;

  constructor(
      private fb: FacebookService,
      private meFacebookService: MeFacebookService) {}

  ngOnInit() {
    this.fb.init(environment.facebook_config);
    this.uri =
        `${this.meFacebookService.getMe().id}/friends?access_token=${this.meFacebookService.getMe().accessToken}`;
  }
  pageWillEnter() {
    this.contacts = [];
    this.fb.api(this.uri)
        .then((res: UIResponse) => this.handlerResponse(res))
        .catch((e: any) => console.error(e));
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let url = this.uri;
      if (this.nextPage) {
        url += '&after=' + this.nextPage;
      }
      console.log(url);

      this.fb.api(url)
          .then((res: UIResponse) => {
            this.handlerResponse(res);
            if (res.data.length === 0) {
              event.target.disabled = true;
            }
          })
          .catch((e: any) => console.error(e));
    }, 500);
  }
  handlerResponse(res) {
    this.data = res;
    this.contacts = [this.contacts, ...res.data];
    this.nextPage = res.paging.cursors.after;
    this.numItems = res.summary.total_count;
    console.log(res);
    console.log(this.contacts);
  }
}
