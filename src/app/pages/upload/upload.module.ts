import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {UploadPage} from './upload.page';

const routes: Routes = [{path: '', component: UploadPage}];

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadPage]
})
export class UploadPageModule {
}
