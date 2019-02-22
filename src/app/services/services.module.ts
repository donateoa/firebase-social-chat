import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ApiService} from './api.service';
import {AuthGuardService} from './auth-guard.service';
import {emojiService} from './emoji.service';
import {StorageService} from './storage.service';
import {ToastService} from './toast.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthGuardService, ToastService, StorageService, ApiService, emojiService
  ]
})
export class ServicesModule {
}
