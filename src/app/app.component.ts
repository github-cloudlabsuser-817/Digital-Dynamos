import { Component, OnInit } from '@angular/core';
import { Keys } from './constants/constant';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  direction = 'ltr';
  constructor(
    private navCtrl: NavController,
  ) {

  }

  ngOnInit() {
    if(localStorage.getItem(Keys.isLoggedIn) === "true") {
      this.navCtrl.navigateRoot('/dashboard');
    }
  }
}
