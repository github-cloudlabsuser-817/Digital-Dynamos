import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.page.html',
  styleUrls: ['./topic-info.page.scss'],
})
export class TopicInfoPage implements OnInit {
  @Input() topics;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  onDismiss() {
    this.modalCtrl.dismiss();
  }
}
