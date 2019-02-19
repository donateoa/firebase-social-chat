import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {CreatePage} from './create.page';

const routes: Routes = [{path: '', component: CreatePage}];

@NgModule({
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {
}
