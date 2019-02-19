import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastController} from '@ionic/angular/';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Principal} from './Principal';

@Injectable({providedIn: 'root'})
export class StorageService {
  private uploadState: Observable<any>;
  private uploadProgress: Observable<any>;
  constructor(
      private afStorage: AngularFireStorage, private principal: Principal) {}



  getDownloadURL(fileName): Promise<string> {
    const p = new Promise<string>((resolve, reject) => {
      let ref = this.afStorage.ref(fileName);
      ref.getMetadata().subscribe(
          t => ref.getDownloadURL().subscribe(t => resolve(t)), e => reject(e));
    });
    return p;
  }

  uploadIfFile(f: any, folder: string): Promise<string> {
    const p = new Promise<string>((resolve, reject) => {
      if (f) {
        const id = Math.random().toString(36).substring(2);
        const mittente = this.principal.identity();
        const filePath = mittente.email + '/' + folder + '/' + id;
        const ref = this.afStorage.ref(filePath);
        const task = ref.put(f);
        this.uploadState = task.snapshotChanges().pipe(map(s => s.state));
        this.uploadProgress = task.percentageChanges();
        task.then(() => this.getDownloadURL(filePath))
            .then((downloadURL) => resolve(downloadURL))
            .catch(e => reject(e));
      } else {
        resolve(null);
      }
    });
    return p;
  }
  getUploadState = (): Observable<any> => this.uploadState
  getUploadProgress = (): Observable<any> => this.uploadProgress
}
