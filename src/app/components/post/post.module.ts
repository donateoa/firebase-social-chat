import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {PostCommentsService} from './post-comments.service';
import {PostComponent} from './post.component';

@NgModule({
  declarations: [PostComponent],
  providers: [PostCommentsService],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [PostComponent]
})
export class PostModule {
}
