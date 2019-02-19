import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {RestService} from 'src/app/services/rest.service';

import {NotificationsPage} from './notifications.page';
import {NotificationsService} from './notifications.service';

const routes: Routes = [{path: '', component: NotificationsPage}];

@NgModule({
  imports:
      [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [NotificationsPage],
  providers: [NotificationsService]
})
export class NotificationsPageModule {
}
