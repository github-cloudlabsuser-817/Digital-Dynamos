import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  selectedFile: any;
  selectedFileName: string;
  
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.selectedFile = undefined;
  }

  onDismiss(status) {
    this.modalCtrl.dismiss(status);
  }

  generate() {
    this.modalCtrl.dismiss(true, this.selectedFile);
  }

  uploadFile() {  
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;  
    fileInput.click();  
  }

  handleFileInput(event: any) {  
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
  }
}
