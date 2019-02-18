import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.page.html',
  styleUrls: ['./media-detail.page.scss'],
})
export class MediaDetailPage implements OnInit {
  fileName: string;
  url: Observable<any>;
  downloadUrl: any;
  contentType: string;
  constructor(
      public loadingController: LoadingController,
      private afStorage: AngularFireStorage,
      private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.presentLoading();
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);  // {media: "media"}
      this.fileName = params['media'] ? params['media'] : null;
      this.getDownloadURL()
    });
  }

  getDownloadURL() {
    let ref = this.afStorage.ref(this.fileName);

    ref.getMetadata().subscribe(t => {
      this.contentType = t.contentType;
      this.url = ref.getDownloadURL();
      this.url.subscribe(t => this.downloadUrl = t);
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({duration: 2000});
    return await loading.present();
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
    xhr.open('GET', this.downloadUrl);
    xhr.send();
  }
}
