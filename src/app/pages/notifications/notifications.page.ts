import 'firebase/functions';
import 'firebase/firestore';

import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {Principal} from 'src/app/services/Principal';
import {RestService} from 'src/app/services/rest.service';
import {ToastService} from 'src/app/services/toast.service';

import {INotification} from './notifications.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  list: INotification[];
  disabledInfiniteScroll = true;
  account: Account;
  loading: any;
  constructor(
      private principal: Principal,
      private loadingController: LoadingController,
      private toastService: ToastService,
      private restService: RestService<INotification>) {}

  ngOnInit() {}


  pageWillEnter() {
    this.transition();
    // reset num of notification must be read
    const user = this.principal.identity();
    const docRef = firebase.firestore().doc(`notification/${user.email}`);
    docRef.set({'contact-notifications': 0}, {merge: true})
        .then(() => console.log('reset num of message must be read'))
        .catch((e) => console.log('error during reset message', e));
  }
  transition() { this.loadPage(false); }
  loadPage(append) {
    this.restService.query(append, null).subscribe(data => {
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
  async presentLoading() {
    this.loading = await this.loadingController.create(
        {message: 'Please Wait...', id: 'login'});
    return await this.loading.present();
  }
  async dismissLoading() { return await this.loading.dismiss(); }


  addToContact(email: string) {
    const firebaseFunction =
        firebase.functions().httpsCallable('acceptContactRequest');
    const that = this;
    const data = {user: email};
    this.presentLoading();
    firebaseFunction(data)
        .then(() => that.loadPage(false))
        .then(() => {
          that.dismissLoading();
          this.toastService.makeToastSuccess('Operazione completata')
        })
        .catch(err => {
          console.log(err);
          that.dismissLoading();
          this.toastService.makeToast(err.message);
        })
  }
}
