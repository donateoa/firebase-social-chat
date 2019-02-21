import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {PostModule} from 'src/app/components/post/post.module';
import {UserPostsService} from 'src/app/services/user-post.service';

import {ProfilePage} from './profile.page';
import {ProfileService} from './profile.service';

const routes: Routes = [{path: '', component: ProfilePage}];

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes),
    PostModule
  ],
  declarations: [ProfilePage],
  providers: [ProfileService, UserPostsService]
})
export class ProfilePageModule {
}
