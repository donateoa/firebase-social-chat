import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {SearchModule} from '../components/search/search.module';
import {TabsModule} from '../components/tabs/tabs.module';
import {RestService} from '../services/rest.service';

import {PostsPage} from './posts.page';

const routes: Routes = [{path: '', component: PostsPage}];

@NgModule({
  imports: [
    TabsModule, SearchModule, CommonModule, FormsModule, IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostsPage],
  providers: [
    RestService,
    {provide: 'collectionKeyBeforeLogin', useValue: 'user-posts'},
    {provide: 'collectionKeyAfterLogin', useValue: 'list'},
  ]
})
export class PostsPageModule {
}
