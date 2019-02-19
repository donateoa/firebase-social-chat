import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {AddPostComponent} from './add-post.component';

@NgModule({
  declarations: [AddPostComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  exports: [AddPostComponent]
})
export class AddPostModule {
}
