import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {RestService} from 'src/app/services/rest.service';

import {NotificationsPage} from './notifications.page';

const routes: Routes = [{path: '', component: NotificationsPage}];

@NgModule({
  imports:
      [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [NotificationsPage],
  providers: [
    RestService,
    {provide: 'collectionKeyBeforeLogin', useValue: 'notifications'},
    {provide: 'collectionKeyAfterLogin', useValue: 'contacts-request'},
  ]
})
export class NotificationsPageModule {
}
