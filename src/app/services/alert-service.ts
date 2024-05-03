import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  //  private alert;
  constructor(
    public alertController: AlertController,
    private translate: TranslateService
  ) {}

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      mode: 'ios'
    });

    await alert.present();
  }

  async createAlertWithOptions(
    header,
    message,
    btn,
    cssClass?,
    backdropDismiss?
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        cssClass: 'custom-color',
        header: header,
        message: message,
        backdropDismiss: false,
        buttons: btn,
        mode: 'ios'
      });
      alert.present();
    });
  }

  async createAlertWithOptionsYesorNo(header, message): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        cssClass: 'resi-alert',
        header,
        message,
        mode: 'ios',
        buttons: [
          {
            text: this.translate.instant('commons.no'),
            role: 'cancel',
            handler: () => {
              resolve('no');
            },
          },
          {
            text: this.translate.instant('commons.yes'),
            handler: () => {
              resolve('yes');
            },
          },
        ],
      });
      alert.present();
    });
  }

  createAlertWthOptionsForDelete(header, message): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        cssClass: 'custom-color',
        header,
        message,
        mode: 'ios',
        buttons: [
          {
            cssClass: 'custom-color',
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve('no');
            },
          },
          {
            cssClass: 'custom-color',
            text: 'Delete',
            handler: () => {
              resolve('delete');
            },
          },
        ],
      });
      alert.present();
    });
  }

  dismissTheAlert() {
    // this.alert.onDidDismiss
  }

  async showAlert(
    header,
    msg,
    mode,
    btn,
    subTitle?,
    cssClass?,
    backdropDismiss?
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader:
        subTitle == null || subTitle === undefined || subTitle === ''
          ? ''
          : subTitle,
      mode: mode,
      message: msg,
      buttons: btn,
      cssClass: cssClass,
      backdropDismiss: backdropDismiss,
    });
    await alert.present();
  }
}
