import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTopicPageRoutingModule } from './add-topic-routing.module';

import { AddTopicPage } from './add-topic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTopicPageRoutingModule
  ],
  declarations: [AddTopicPage]
})
export class AddTopicPageModule {}
