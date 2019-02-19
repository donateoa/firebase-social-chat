import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {IPost} from 'src/app/model/post.model';
import {ApiService} from 'src/app/services/api.service';
import {StorageService} from 'src/app/services/storage.service';
import {ToastService} from 'src/app/services/toast.service';

export const atLeastOne = (validator: ValidatorFn) =>
    (group: FormGroup, ): ValidationErrors | null => {
      const hasAtLeastOne = group && group.controls &&
          Object.keys(group.controls).some(k => !validator(group.controls[k]));

      return hasAtLeastOne ? null : {
        atLeastOne: true,
      };
    };

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @Output() output: EventEmitter<any> = new EventEmitter();
  file;
  fileAsDataURL;
  contentType: string;
  uploading = false;
  loading: any;
  validations_form: FormGroup;

  constructor(
      public formBuilder: FormBuilder,
      private loadingController: LoadingController,
      private toastService: ToastService,
      private storageService: StorageService, private apiService: ApiService) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group(
        {
          text: [''],
          file: [''],
        },
        {validator: atLeastOne(Validators.required)});
  }

  sendPost() {
    let post: IPost = {text: this.validations_form.get('text').value};
    this.presentLoading();
    const that = this;
    this.storageService.uploadIfFile(this.file, 'posts')
        .then((downloadURL) => {
          if (downloadURL) {
            post.media = downloadURL;
          }
          this.apiService.addPost(post).then(() => {
            that.dismissLoading();
            this.validations_form.reset();
            that.output.emit(true);
          })
        })
        .catch(e => {
          that.toastService.makeToast(e.message);
          that.dismissLoading();
          that.output.emit(true);
          console.log(e);
        })
  }
  async presentLoading() {
    this.loading = await this.loadingController.create(
        {message: 'Please Wait...', id: 'login'});
    return await this.loading.present();
  }
  async dismissLoading() { return await this.loading.dismiss(); }

  /* Read data from file */
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.file = file;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.contentType = file.type;
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.fileAsDataURL = reader.result
  }
  onKey(event: any) {
    if (event.which === 13) {
      this.sendPost();
    }
    event.preventDefault();
  }
}
