import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {UsersPage} from './users.page';
import {UsersService} from './users.service';

const routes: Routes = [{path: '', component: UsersPage}];

@NgModule({
  imports:
      [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [UsersPage],
  providers: [UsersService]
})
export class UsersPageModule {
}
