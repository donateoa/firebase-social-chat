import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {RestService} from 'src/app/services/rest.service';

import {ChatsPage} from './chats.page';

const routes: Routes = [{path: '', component: ChatsPage}];

@NgModule({
  imports:
      [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [ChatsPage],
  providers: [
    RestService,
    {provide: 'collectionKeyBeforeLogin', useValue: 'chats'},
    {provide: 'collectionKeyAfterLogin', useValue: 'list'},
  ]
})
export class ChatsPageModule {
}
