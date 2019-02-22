import 'firebase/functions'

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class emojiService {
  data;
  constructor(private http: HttpClient) {}
  getData() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(
        resolve => {
            this.http.get('./../assets/emoji/emoji.json')
                .subscribe((data) => {{this.data = data; resolve(this.data);}})

        });
  }
}
