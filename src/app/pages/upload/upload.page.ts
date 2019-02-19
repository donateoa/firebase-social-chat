import 'firebase/functions';

import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import {Principal} from 'src/app/services/Principal';
import {ToastService} from 'src/app/services/toast.service';

import {IMessage} from '../chat/message.model';
import {IUser, User} from '../users/user.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  file;
  fileAsDataURL;
  contentType: string;
  uploading = false;
  downloadURL;
  message: string;
  mittente: User;
  destinatario: IUser;
  loading: any;
  constructor(
      private loadingController: LoadingController,
      private activatedRoute: ActivatedRoute, private location: Location,
      private toastService: ToastService, private principal: Principal,
      private afStorage: AngularFireStorage) {}

  pageWillEnter() {
    this.activatedRoute.data.subscribe(({user}) => {
      console.log('detect destinario ', user);
      this.destinatario = user;
      this.mittente = this.principal.identity();
      const url =
          `${this.mittente.getChats()}/${this.destinatario.email}/messages`;
      console.log('subscribe to stream ', url);

    });
  }
  onKey(event: any) {
    if (event.which === 13) {
      this.sendAttachment();
    }
    event.preventDefault();
  }
  sendAttachment() {
    if (!this.file) {
      return false;
    }
    this.presentLoading();
    const that = this;
    const f = this.file;
    const id = Math.random().toString(36).substring(2);
    const filePath =
        this.mittente.email + '/chats/' + this.destinatario.email + '/' + id;
    this.ref = this.afStorage.ref(filePath);
    this.task = this.ref.put(f);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.then(
        snapshot => {
          this.uploadState = of (null);
          this.sendMessage(filePath).then(() => {
            that.dismissLoading();
            that.location.back();
          })
        },
        err => {
          this.toastService.makeToast(err.message);
          that.dismissLoading();
          console.log(err);
        })
  }
  async presentLoading() {
    this.loading = await this.loadingController.create(
        {message: 'Please Wait...', id: 'login'});
    return await this.loading.present();
  }
  async dismissLoading() { return await this.loading.dismiss(); }


  sendMessage(media: string) {
    const firebaseFunction =
        firebase.functions().httpsCallable('sendMessageToUser');
    const data: IMessage = {
      'uid': this.destinatario.uid,
      'media': media,
      'text': this.message
    };
    return firebaseFunction(data);
  }
  /* Read data from file */
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.file = file;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.contentType = file.type;
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.fileAsDataURL = reader.result
  }
}
