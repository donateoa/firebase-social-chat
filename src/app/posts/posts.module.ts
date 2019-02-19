import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {AddPostModule} from '../components/add-post/add-post.module';
import {PostModule} from '../components/post/post.module';
import {SearchModule} from '../components/search/search.module';
import {TabsModule} from '../components/tabs/tabs.module';

import {PostService} from './post.service';
import {PostsPage} from './posts.page';
import {UserPostsService} from './user-post.service';

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
