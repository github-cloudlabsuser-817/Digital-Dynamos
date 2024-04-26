import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  constructor(
    private loadingController: LoadingController,
  ) {
  }

  async present(loadingId: string, loadingMessage?) {
    this.isLoading = true;

    return await this.loadingController.create({
      id: loadingId,
      message: loadingMessage || ''
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss(loadingId: string) {
    this.isLoading = false;
    return await this.loadingController.dismiss(null, null, loadingId)
      .then(() => console.log('dismissed')).catch((err) => {
        //console.log("error dissmiss", err); 
      });
  }

  timerOutLoader(duration?: number) {
    this.loadingController.create({
      message: 'Please wait',
      spinner: 'crescent',
      mode: 'ios',
      duration: duration,
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        //console.log('Loading dismissed! after', duration, "milisec", dis);
      });
    });

  }
}