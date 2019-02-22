import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {emojiService} from 'src/app/services/emoji.service';

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent implements OnInit {
  emoji;
  output = '';
  constructor(
      private emojiService: emojiService,
      private modalController: ModalController) {}

  ngOnInit() {
    this.emojiService.getData().then(data => {this.emoji = data.face});
  }
  onTap(e) { this.output = this.output + e; }
  dismiss() { this.modalController.dismiss({'action': 'cancel'}) }
  apply() {
    this.modalController.dismiss({'output': this.output});
    this.output = '';
  }
}
