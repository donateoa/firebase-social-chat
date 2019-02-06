import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {ProfileService} from './ProfileService';
import {ProfilePage} from './profile.page';

const routes: Routes = [{path: '', component: ProfilePage}];

@NgModule({
  imports:
      [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [ProfilePage],
  providers: [ProfileService]
})
export class ProfilePageModule {
}
