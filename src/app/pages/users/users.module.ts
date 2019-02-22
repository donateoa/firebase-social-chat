import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';

import {ContactsPageModule} from '../contacts/contacts.module';

import {UsersPage} from './users.page';
import {UsersService} from './users.service';

const routes: Routes = [{path: '', component: UsersPage}];

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule, SearchModule,
    ContactsPageModule, RouterModule.forChild(routes)
  ],
  declarations: [UsersPage],
  providers: [UsersService]
})
export class UsersPageModule {
}
