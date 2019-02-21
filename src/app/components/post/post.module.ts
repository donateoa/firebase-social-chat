import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {PostService} from 'src/app/services/post.service';

import {PostCommentsService} from './post-comments.service';
import {PostComponent} from './post.component';

@NgModule({
  declarations: [PostComponent],
  providers: [PostCommentsService, PostService],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  exports: [PostComponent]
})
export class PostModule {
}
