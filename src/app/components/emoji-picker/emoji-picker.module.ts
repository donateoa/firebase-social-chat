import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonButton, IonicModule} from '@ionic/angular';

import {EmojiPickerComponent} from './emoji-picker.component';

@NgModule({
  declarations: [EmojiPickerComponent],
  imports: [CommonModule, IonicModule],
  exports: [EmojiPickerComponent],
  entryComponents: [EmojiPickerComponent]
})
export class EmojiPickerModule {
}
