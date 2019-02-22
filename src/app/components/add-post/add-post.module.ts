import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {EmojiPickerModule} from '../emoji-picker/emoji-picker.module';

import {AddPostComponent} from './add-post.component';

@NgModule({
  declarations: [AddPostComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, EmojiPickerModule],
  exports: [AddPostComponent]
})
export class AddPostModule {
}
