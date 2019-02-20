import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {AddPostModule} from 'src/app/components/add-post/add-post.module';
import {PostModule} from 'src/app/components/post/post.module';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';
import {PostService} from 'src/app/services/post.service';
import {UserPostsService} from 'src/app/services/user-post.service';

import {PostsPage} from './posts.page';

const routes: Routes = [{path: '', component: PostsPage}];

@NgModule({
  imports: [
    TabsModule, SearchModule, CommonModule, FormsModule, IonicModule,
    PostModule, AddPostModule, RouterModule.forChild(routes)
  ],
  declarations: [PostsPage],
  providers: [
    PostService,
    UserPostsService,
  ]
})
export class PostsPageModule {
}
