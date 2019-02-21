import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {AddPostModule} from 'src/app/components/add-post/add-post.module';
import {PostModule} from 'src/app/components/post/post.module';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';

import {BachecaService} from './bacheca.service';
import {HomePage} from './home.page';

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule, SearchModule,
    AddPostModule, PostModule,
    RouterModule.forChild([{path: '', component: HomePage}])
  ],
  declarations: [HomePage],
  providers: [BachecaService]
})
export class HomePageModule {
}
