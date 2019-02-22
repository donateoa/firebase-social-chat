import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.page.html',
  styleUrls: ['./media-detail.page.scss'],
})
export class MediaDetailPage implements OnInit {
  fileName: string;
  url: Observable<any>;
  media: any;
  constructor(
      private modalController: ModalController, private navParams: NavParams,
      public loadingController: LoadingController,
      private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.navParams.data.media) {
      this.media = this.navParams.data.media;
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log(params);  // {media: "media"}
        this.media = params['media'] ? params['media'] : null;
      });
    }
  }

  downloadFile() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    const fileName = this.fileName;
    xhr.onload = function(event) {
      const blob = xhr.response;
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.dispatchEvent(new MouseEvent('click'));
    };
    xhr.open('GET', this.media);
    xhr.send();
  }
  dismiss() { this.modalController.dismiss(); }
}
