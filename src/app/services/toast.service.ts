import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular/';
@Injectable({providedIn: 'root'})
export class ToastService {
  constructor(private toastController: ToastController) {}
  async makeToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Chiudi',
      color: 'danger'
    });
    toast.present();
  }
  async makeToastSuccess(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Chiudi',
      color: 'success'
    });
    toast.present();
  }
  async makeToastError(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Chiudi',
      color: 'danger'
    });
    toast.present();
  }
}
