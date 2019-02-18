import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SearchModule} from 'src/app/components/search/search.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';

import {HomePage} from './home.page';

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule, SearchModule,
    RouterModule.forChild([{path: '', component: HomePage}])
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
