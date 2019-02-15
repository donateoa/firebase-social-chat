import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {ContatctService} from './contact.service';
import {ContactsPage} from './contacts.page';

const routes: Routes = [{path: '', component: ContactsPage}];

@NgModule({
  imports:
      [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [ContactsPage],
  providers: [ContatctService]
})
export class ContactsPageModule {
}
