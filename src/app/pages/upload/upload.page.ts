import 'firebase/functions';

import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {atLeastOne} from 'src/app/components/add-post/add-post.component';
import {Principal} from 'src/app/services/Principal';
import {ApiService} from 'src/app/services/api.service';
import {StorageService} from 'src/app/services/storage.service';
import {ToastService} from 'src/app/services/toast.service';

import {IMessage} from '../chat/message.model';
import {IUser, User} from '../users/user.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})

export class UploadPage {
  file;
  fileAsDataURL;
  contentType: string;
  uploading = false;
  loading: any;
  validations_form: FormGroup;
  mittente: User;
  destinatario: IUser;
  constructor(
      private principal: Principal, private activatedRoute: ActivatedRoute,
      public formBuilder: FormBuilder,
      private loadingController: LoadingController,
      private toastService: ToastService, private location: Location,
      private storageService: StorageService, private apiService: ApiService) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group(
        {
          text: [''],
          file: [''],
        },
        {validator: atLeastOne(Validators.required)});
  }

  sendAttachment() {
    this.presentLoading();
    const message: IMessage = {
      'uid': this.destinatario.uid,
      'text': this.validations_form.get('text').value
    };
    const that = this;
    const folder = 'chats/' + this.destinatario.email;
    this.storageService.uploadIfFile(this.file, folder)
        .then((downloadURL) => {
          if (downloadURL) {
            message.media = downloadURL;
          }

          this.apiService.sendMessage(message).then(() => {
            that.dismissLoading();
            that.location.back();
          })
        })
        .catch(e => {
          this.toastService.makeToast(e.message);
          that.dismissLoading();
          console.log(e);
        })
  }
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

  async presentLoading() {
    this.loading = await this.loadingController.create(
        {message: 'Please Wait...', id: 'login'});
    return await this.loading.present();
  }
  async dismissLoading() { return await this.loading.dismiss(); }

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
