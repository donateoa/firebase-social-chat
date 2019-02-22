import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';

import {ContactsService} from '../contacts/contacts.service';

import {UsersPage} from './users.page';
import {UsersService} from './users.service';

const routes: Routes = [{path: '', component: UsersPage}];

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule, SearchModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersPage],
  providers: [UsersService, ContactsService]
})
export class UsersPageModule {
}
