import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {TabsModule} from 'src/app/components/tabs/tabs.module';

import {HomePage} from './home.page';

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, TabsModule,
    RouterModule.forChild([{path: '', component: HomePage}])
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
