import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { HttpService } from '../services/http-service';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.page.html',
  styleUrls: ['./add-topic.page.scss'],
})
export class AddTopicPage implements OnInit {
  @Input() topics;

  topicName = '';
  topicDescription = '';
  isFormValid: boolean = true;
  constructor(
    private modalCtrl: ModalController, 
    private httpService: HttpService
  ) { }

  ngOnInit() {
  }

  onDismiss(status) {
    this.modalCtrl.dismiss(status);
  }

  onSave() {
    if (this.topicName === '') {
      this.isFormValid = false;
      return;
    } else {
      this.isFormValid = true;
    }
    let id = this.topics.length + 1;
    this.topics.push({
      id: "T" + id,
      value: this.topicName,
      description: this.topicDescription,
      isGlobal: "false",
      sortOrder: id
    });
    if (localStorage.getItem('topics')) {
      localStorage.setItem('topics', JSON.stringify(this.topics));
      this.onDismiss(true);
    }
  }
}
