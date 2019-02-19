import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {PostComponent} from './post.component';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [PostComponent]
})
export class PostModule {
}
