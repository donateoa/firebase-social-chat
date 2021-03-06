import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {EmojiPickerModule} from 'src/app/components/emoji-picker/emoji-picker.module';

import {ChatPage} from './chat.page';

const routes: Routes = [{path: '', component: ChatPage}];

@NgModule({
  imports: [
    EmojiPickerModule, CommonModule, FormsModule, IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatPage],
})
export class ChatPageModule {
}
