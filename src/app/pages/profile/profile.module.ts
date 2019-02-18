import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';

import {ProfilePage} from './profile.page';
import {ProfileService} from './profile.service';

const routes: Routes = [{path: '', component: ProfilePage}];

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule, SearchModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage],
  providers: [ProfileService]
})
export class ProfilePageModule {
}
