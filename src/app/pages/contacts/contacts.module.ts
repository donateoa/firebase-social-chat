import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';
import {RestService} from 'src/app/services/rest.service';

import {ContactsPage} from './contacts.page';

const routes: Routes = [{path: '', component: ContactsPage}];

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule, SearchModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactsPage],
  providers: [
    RestService,
    {provide: 'collectionKeyBeforeLogin', useValue: 'contacts'},
    {provide: 'collectionKeyAfterLogin', useValue: 'list'},
  ]
})
export class ContactsPageModule {
}
