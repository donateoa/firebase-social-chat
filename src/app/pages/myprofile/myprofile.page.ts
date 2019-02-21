import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {ToastService} from 'src/app/services/toast.service';
import {UserPostsService} from 'src/app/services/user-post.service';

import {ProfilePage} from '../profile/profile.page';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage extends ProfilePage {
  changed = false;
  loading;
  constructor(
      private toastService: ToastService,
      private loadingController: LoadingController,
      userPostsService: UserPostsService, profileService: ProfileService,
      activatedRoute: ActivatedRoute) {
    super(userPostsService, profileService, activatedRoute, )
  }
  save() {
    this.presentLoading();
    this.profile.uid = this.user.uid;
    this.profileService.update(this.profile)
        .subscribe(_ => this.onSaveHandler(), e => this.onErrorHandler(e));
  }
  onSaveHandler() {
    this.dismissLoading();
    this.changed = false;
  }
  onErrorHandler(msg) {
    this.toastService.makeToastError(msg);
    console.log(msg);
  }
  async presentLoading() {
    this.loading = await this.loadingController.create(
        {message: 'Please Wait...', id: 'login'});
    return await this.loading.present();
  }
  async dismissLoading() { return await this.loading.dismiss(); }
}
