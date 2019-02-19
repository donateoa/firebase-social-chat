import 'firebase/functions'

import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import {Principal} from 'src/app/services/Principal';
import {ToastService} from 'src/app/services/toast.service';

import {IPost} from '../post.model';

export const atLeastOne = (validator: ValidatorFn) =>
    (group: FormGroup, ): ValidationErrors | null => {
      const hasAtLeastOne = group && group.controls &&
          Object.keys(group.controls).some(k => !validator(group.controls[k]));

      return hasAtLeastOne ? null : {
        atLeastOne: true,
      };
    };

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  ref: AngularFireStorageReference;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  file;
  fileAsDataURL;
  contentType: string;
  uploading = false;
  loading: any;
  validations_form: FormGroup;

  constructor(
      private principal: Principal, public formBuilder: FormBuilder,
      private loadingController: LoadingController, private location: Location,
      private toastService: ToastService,
      private afStorage: AngularFireStorage) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group(
        {
          text: [''],
          title: [''],
        },
        {validator: atLeastOne(Validators.required)});
  }
  getDownloadURL(fileName) {
    let ref = this.afStorage.ref(fileName);
    ref.getDownloadURL().toPromise();
  }

  uploadIfFile(): Promise<string> {
    const p = new Promise<string>((resolve, reject) => {
      if (this.file) {
        const f = this.file;
        const id = Math.random().toString(36).substring(2);
        const mittente = this.principal.identity();
        const filePath = mittente.email + '/posts/' + id;
        this.ref = this.afStorage.ref(filePath);
        const task = this.ref.put(f);
        this.uploadState = task.snapshotChanges().pipe(map(s => s.state));
        this.uploadProgress = task.percentageChanges();
        task.then(() => this.getDownloadURL(filePath))
            .then((downloadURL) => resolve(downloadURL))
            .catch(e => reject(e));
      } else {
        resolve(null);
      }
    });
    return p;
  }
  sendPost() {
    let post: IPost = {
      title: this.validations_form.get('title').value,
      text: this.validations_form.get('text').value
    };
    this.presentLoading();
    const that = this;
    this.uploadIfFile()
        .then((downloadURL) => {
          if (downloadURL) {
            post.media = downloadURL;
          }
          this.uploadState = of (null);
          this.addPost(post).then(() => {
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
  async presentLoading() {
    this.loading = await this.loadingController.create(
        {message: 'Please Wait...', id: 'login'});
    return await this.loading.present();
  }
  async dismissLoading() { return await this.loading.dismiss(); }


  addPost(post: IPost) {
    const firebaseFunction = firebase.functions().httpsCallable('createPost');
    return firebaseFunction(post);
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
