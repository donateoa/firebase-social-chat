import 'firebase/firestore';
import 'firebase/functions';

import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonContent, LoadingController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {Observable, of } from 'rxjs';
import {PAGE_SIZE} from 'src/app.constants';
import {SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {Principal} from 'src/app/services/Principal';
import {ToastService} from 'src/app/services/toast.service';

import {IUser} from '../users/user.model';

import {IMessage} from './message.model';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('textbox') textbox: any;
  message: string;
  messages: IMessage[] = [];
  mittente: IUser;
  destinatario: IUser;
  destinatario$: Observable<IUser>;
  docRef: any;
  lastVisible: IMessage;
  disabledInfiniteScroll = true;
  unsubscribe;
  loading: any;

  constructor(
      private toastService: ToastService,
      private loadingController: LoadingController, private router: Router,
      private activatedRoute: ActivatedRoute, private principal: Principal) {}

  query(next: boolean) {
    if (next) {
      return this.docRef.orderBy('creationDate', SortType.DESC)
          .startAfter(this.lastVisible)
          .limit(PAGE_SIZE);
    } else {
      return this.docRef.orderBy('creationDate', SortType.DESC)
          .limit(PAGE_SIZE);
    }
  }
  setLastVisible = (documentSnapshots) => this.lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

  updateRead() {
    const url = `chats/${this.mittente.email}/list/${this.destinatario.email}`;
    firebase.firestore()
        .doc(url)
        .set({read: 0}, {merge: true})
        .then(t => console.log('update message read to ', url))
        .catch(e => console.log);
  }

  pageWillEnter() {
    this.activatedRoute.data.subscribe(({user}) => {
      console.log('detect destinario ', user);
      this.destinatario = user;
      this.destinatario$ = of (user);
      this.mittente = this.principal.identity();
      const url =
          `chats/${this.mittente.email}/list/${this.destinatario.email}/messages`;
      console.log('subscribe to stream ', url);

      this.docRef = firebase.firestore().collection(url);
      this.updateRead();
      // this.docRef =
      this.messages = [];
      this.unsubscribe = this.query(false).onSnapshot(documentSnapshots => {
        setTimeout(() => {
          this.content.scrollToBottom(300);
          this.disabledInfiniteScroll = false;
        }, 1000);
        this.setLastVisible(documentSnapshots);
        // // listen on change
        documentSnapshots.docChanges().reverse().forEach(change => {
          if (change.type === 'added') {
            const message: IMessage = change.doc.data();
            console.log('get', message);
            this.messages.push(message);
            setTimeout(() => { this.content.scrollToBottom(300); }, 100);
          }
        });
      });
    });
  }
  navigateToDetail(media: string) {
    const p = media.split('/');
    this.router.navigate(['media-detail', ...p])
  }

  ngOnDestroy() { this.unsubscribe(); }
  loadPage() {
    this.query(true).get().then(documentSnapshots => {
      if (documentSnapshots.docs.length <= 0) {
        // disable infinite-scroll when data are fineshed
        this.disabledInfiniteScroll = true;
      } else {
        this.messages = [
          ...documentSnapshots.docs.map(t => t.data()).reverse(),
          ...this.messages
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
  async presentLoading() {
    this.loading = await this.loadingController.create(
        {message: 'Please Wait...', id: 'login'});
    return await this.loading.present();
  }
  async dismissLoading() { return await this.loading.dismiss(); }


  sendMessage() {
    const firebaseFunction =
        firebase.functions().httpsCallable('sendMessageToUser');
    const that = this;
    this.presentLoading();
    const data: IMessage = {'uid': this.destinatario.uid, 'text': this.message};
    firebaseFunction(data)
        .then(() => that.dismissLoading())
        .catch(err => {
          console.log(err);
          that.dismissLoading();
          this.toastService.makeToast(err.message);
        })

            this.message = '';
    this.textbox.setFocus();
  }
  onKey(event: any) {
    if (event.which === 13) {
      this.sendMessage();
    }
    event.preventDefault();
  }
}
