import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {AddPostModule} from 'src/app/components/add-post/add-post.module';
import {PostModule} from 'src/app/components/post/post.module';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';
import {UserPostsService} from 'src/app/services/user-post.service';

import {ContactsService} from '../contacts/contacts.service';
import {ProfileService} from '../profile/profile.service';

import {MyprofilePage} from './myprofile.page';

const routes: Routes = [{path: '', component: MyprofilePage}];

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule, SearchModule,
    AddPostModule, PostModule, RouterModule.forChild(routes)
  ],
  declarations: [MyprofilePage],
  providers: [ProfileService, UserPostsService, ContactsService]
})
export class MyprofilePageModule {
}
